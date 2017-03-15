var http = require('http');
var fs = require('fs');
var mysql = require('mysql');
var querystring = require('querystring');
var server = http.createServer(function(req,res){
	if(req.url!='favicon.ico'){
		req.on('data',function(data){
			console.log('服务器端接收到的数据:'+decodeURIComponent(data));
			var udata = querystring.parse(decodeURIComponent(data));
			console.log(udata);
		});
		req.on('end',function(){
			console.log('客户端请求数据已全部接受完毕')
		})
	}
	res.end();
}).listen(1337,"127.0.0.1");
// server.on('listening',function(){
// 	console.log('服务器端开始监听');
// 	// server.close();
// });
// server.on('close',function(){
// 	console.log('服务器已被关闭')
// });

// server.on('connection',function(socket){
// 	console.log("客户端连接以建立")
// })