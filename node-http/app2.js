var http = require('http');
var server = http.createServer(function(req,res){

}).listen(1337,"127.0.0.1");
server.on('listening',function(){
	console.log('服务器端开始监听');
	// server.close();
});
server.on('close',function(){
	console.log('服务器已被关闭')
});
server.on('error',function(e){
	if(e.code === 'EADDRINUSE'){
		console.log('服务器端口及地址已被占用')
	}
})