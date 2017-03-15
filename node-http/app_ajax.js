var http = require('http');
var server = http.createServer(function(req,res){
	if(req.url!=='favicon.ico'){
		console.log('**********')
		res.writeHead(200,{'Content-Type':'text/plain',
			'Access-Control-Allow-Origin':'http://localhost:8080'});
		res.write('你好');
	}
	res.end();
}).listen(1337,"localhost");