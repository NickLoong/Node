var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	port:'3306',
	database:'blog',
	user:'root',
	password:'123456'
});
connection.connect(function(err){
	if(err) console.log('连接失败');
	else{
		console.log('链接成功');
		connection.query('INSERT INTO user SET ?',
		{username:'凌牛',firstname:'陆'},function(err,result){
			if(err) console.log('插入数据失败');
			else{
				console.log('插入的数据ID为：',result.insertId)
				connection.end();
				// connection.query(
				// 	'SELECT * FROM ??',['user'],function(err,result){
				// 	if(err) console.log('查询数据失败');
				// 	else{
				// 		console.log(result.insertId);
				// 		connection.end();
				// 	}
				// });
			}
		});
	}
})