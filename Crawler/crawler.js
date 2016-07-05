var http = require('http');

var options = {
	host: 'www.laws.taipei.gov.tw',
	port: 80,
	path: '/lawsystem/wfLaw_ArticleContent.aspx?LawID=P05B1001-20160701&RealID=05-02-1001'
};

var data = '';

var req = http.get(options, function(res) {
	console.log(options.host);
});

req.on('response', function(response) {
	response.on('data', function(chunk) {
		data = data + chunk;
	});
	response.on('end', function() {
		console.log(JSON.stringify(data));
	});
});