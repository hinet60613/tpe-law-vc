require('mocha');
var should = require('should');
var Parser = require('../Crawler/Parser');

describe('Char to Int', function() {
	var tests = [
		{args: '一', expected: 1},
		{args: '五', expected: 5},
		{args: '十', expected: 10},
		{args: '十五', expected: 15},
		{args: '一百', expected: 100},
		{args: '一百零五', expected: 105},
		{args: '一百一十五', expected: 115},
		{args: '一千零五十', expected: 1050},
	];
	tests.forEach(function(test) {
		it(test.args, function() {
			test.expected.should.equal(Parser.chCharToInt(test.args));
		});
	});
});
describe('Article Parser', function() {
	var tests = [
		{
			args: '第  七  條    市政府設臺北自來水事業處，其組織自治條例另定之。',
			expected: {
				'no': 7,
				'article': [
					'市政府設臺北自來水事業處，其組織自治條例另定之。'
				]
			}
		},
		{
			args: '第  四  條    學校應於遴委會委員產生後二十日內召開第一次會議。\r\n' +
					'遴委會置召集人一人，由委員互選產生，召集會議並擔任主席。召集人因故\r\n' +
					'不能出席時，由委員互推一人代理之。\r\n' + 
					'遴委會開會時，委員應親自出席，不得委託他人代理；應有二分之一以上委\r\n' +
					'員出席始得開議，出席委員三分之二以上之同意始得決議。',
			expected : {
				'no': 4,
				'article': [
					'學校應於遴委會委員產生後二十日內召開第一次會議。',
					'遴委會置召集人一人，由委員互選產生，召集會議並擔任主席。召集人因故' + 
						'不能出席時，由委員互推一人代理之。',
					'遴委會開會時，委員應親自出席，不得委託他人代理；應有二分之一以上委' +
						'員出席始得開議，出席委員三分之二以上之同意始得決議。'
				]
			}
		}, {
			args: '第 十一 條    本處設處務會議，由處長召集之並擔任主席，每月舉行一次，必要時得召開' +
					'臨時會議，均以下列人員組成：' + 
					'一  處長。' +
					'二  副處長。' +
					'三  主任秘書。' +
					'四  專門委員。' +
					'五  科長。' +
					'六  主任。' +
					'前項會議必要時，得由處長邀請或指定其他有關人員列席。',
			expected: {
				'no': 11,
				'article': [
					'本處設處務會議，由處長召集之並擔任主席，每月舉行一次，必要時得召開' +
						'臨時會議，均以下列人員組成：',
					'',
					'前項會議必要時，得由處長邀請或指定其他有關人員列席。'
				]
			}
		}
	];
	tests.forEach(function(test) {
		it(test.args, function() {
			test.expected.should.eql(Parser.ArticleParser(test.args));
		});
	});
})