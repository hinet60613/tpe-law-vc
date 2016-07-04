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
				'article': '市政府設臺北自來水事業處，其組織自治條例另定之。'
			}
		}
	];
	tests.forEach(function(test) {
		it(test.args, function() {
			test.expected.should.eql(Parser.ArticleParser(test.args));
		});
	});
})