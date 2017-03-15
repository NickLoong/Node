var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	database:'mysql',
	user:'root',
	password:'123456'
});
var pool = mysql.createPool({
	host:'localhost',
	port:3306,
	database:'mysql',
	user:'root',
	password:'123456'
});
function handleDisconnect(){
	connection.connect(function(err){
		if(err) console.log("连接失败");
		else{
			console.log("链接成功")
		}
	});
}
connection.on('error',function(err){
	if(err.code === 'PROTOCOL_CONNECTION_LOST'){
		console.log("链接丢失");
		setTimeout(function(){
			handleDisconnect();
		},1000);
	}
	else{
		throw err;
	}
})
handleDisconnect();
// connection.connect(function(err){
// 	if(err) console.log('连接失败');
// 	else{
// 		console.log('连接成功');
// 	}
// });
// connection.end(function(err){
// 	if(err) console.log('关闭失败');
// 	else{
// 		console.log('关闭成功');
// 	}
// })