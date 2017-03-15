var mysql = require('mysql');
var pool = mysql.createPool({
	host:'localhost',
	port:'3306',
	database:'blog',
	user:'root',
	password:'123456',
});
pool.getConnection(function(err,connection){
	if(err) console.log('链接失败');
	else{
		console.log('链接成功');
		connection.query('select * from user',function(err,rows){
			if(err) console.log('查询数据失败');
			else{
				console.log(rows);
				pool.end();
			}
		})
	}
});