function chCharToInt(charString) {
	var getValue = {
		'零': 0,
		'一': 1,
		'二': 2,
		'三': 3,
		'四': 4,
		'五': 5,
		'六': 6,
		'七': 7,
		'八': 8,
		'九': 9,

	};
	var getMagnitude = {
		'十': 10,
		'百': 100,
		'千': 1000
	};
	var returnValue = 0;
	var number = 0;
	for (var i = 0; i < charString.length; i++) {
		var num = getValue[charString[i]];
		if (typeof num !== 'undefined') {
			number = num;
		} else {
			num = getMagnitude[charString[i]];
			if (typeof num !== 'undefined') {
				if (number == 0) number = 1;
				number = number * getMagnitude[charString[i]];
				returnValue = returnValue + number;
				number = 0;
			}
		}
	}
	returnValue = returnValue + number;
	return returnValue;
}

var ArticleParser = function(charString) {
	var objArticle = {};
	var ptnArticleNumber = new RegExp("第[\u4e00-\u9fa5]*條");
	var charStringWithoutSpace = charString.replace(/\s/g, '');
	var numberString = charStringWithoutSpace.match(ptnArticleNumber);
	var articleString = charStringWithoutSpace.replace(numberString[0], '');
	objArticle['no'] = chCharToInt(numberString[0]);
	objArticle['article'] = articleString;
	return objArticle;
}

/*** Unit Testing Code ***/ /*
console.log(chCharToInt('一'));
console.log(chCharToInt('五'));
console.log(chCharToInt('十'));
console.log(chCharToInt('十五'));
console.log(chCharToInt('一十五'));
console.log(chCharToInt('一百零五'));
console.log(chCharToInt('一百一十五'));
console.log(chCharToInt('一千零五'));
console.log(chCharToInt('一千零五十'));
console.log(ArticleParser("第  七  條    市政府設臺北自來水事業處，其組織自治條例另定之。"));
*/