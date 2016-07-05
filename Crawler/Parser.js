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
	charString = JSON.stringify(charString);
	var objArticle = {};
	var charStringWithoutSpace = charString.replace(/\s/g, '').replace(/\"/g, '');

	var ptnArticleNumber = new RegExp("第[\u4e00-\u9fa5]*條");
	var numberString = charStringWithoutSpace.match(ptnArticleNumber);

	var articles = charStringWithoutSpace.replace(numberString[0], '').split('。\\r\\n');
	
	articles.forEach(function(article, idx) {
		article = article.replace('\\r\\n', '');
		if(idx < articles.length-1) article += '。';
		articles[idx] = article;
	});
	objArticle['no'] = chCharToInt(numberString[0]);
	objArticle['article'] = articles;
	return objArticle;
}

module.exports = {
	chCharToInt: chCharToInt,
	ArticleParser: ArticleParser
};