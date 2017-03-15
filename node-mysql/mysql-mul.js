var mysql = require('mysql');
var fs = require('fs');
var tableName = "user";
var connection = mysql.createConnection({
	host:'localhost',
	port:'3306',
	database:'blog',
	multipleStatements:true,
	user:'root',
	password:'123456',
});
// 以数据流的方式处理查询数据
var out = fs.createWriteStream('./message.txt');
out.on('error',function(err){
	console.log('写文件操作失败。错误信息为：'+err.message);
	process.exit();
});
connection.connect(function(err){
	if(err) console.log('链接失败');
	else{
		console.log('连接成功');
		var query = connection.query('select * from user');
		query
		.on('error',function(err){
			console.log('读取数据失败：失败信息为：'+err.message);
			process.exit();
		})
		.on('fields',function(fields){
			var str = '';
			fields.forEach(function(field){
				if(str!='')
					str+=String.fromCharCode(9);
				str+=field.name;
			});
			out.write(str+'\r\n');
		})
		.on('result',function(row){
			connection.pause();
			out.write(row.id+String.fromCharCode(9)+row.username+
			String.fromCharCode(9)+row.firstname+'\r\n',function(err){
				connection.resume();
			});
		})
		.on('end',function(){
			console.log('数据全部写入完毕');
			connection.end();
		})
	}
});


/**多条语句查询*/
// connection.connect(function(err){
// 	if(err) console.log('链接失败');
// 	else{
// 		console.log('链接成功');
// 		insertData();
// 		// connection.end();
// 	}
// });
// function insertData(){
// 	var sqlStr = '';
// 	for(var i=1;i<4;i++){
// 		sqlStr+="INSERT INTO "+tableName+"(username,firstname) values("+connection.escape("用户名"+i.toString())+
// 		","+connection.escape("姓"+i.toString())+");";
// 	}
// 	connection.query(sqlStr,function(err,result){
// 		if(err) console.log('插入数据失败');
// 		else{
// 			updataData()
// 		}
// 	});
// }
// function updataData(){
// 	connection.query("update "+tableName+" set firstname =? where username=?",
// 		["姓100","用户名2"],function(err,result){
// 			if(err) console.log('更新数据失败');
// 			else{
// 				deleteData();
// 			}
// 	})
// }
// function deleteData(){
// 	connection.query("delete from "+tableName+" where username=?",["用户名3"],function(err,result){
// 		if(err) console.log('删除数据失败');
// 		else{
// 			queryData();
// 		}
// 	});
// }
// function queryData(){
// 	connection.query("SELECT * FROM "+tableName,function(err,result){
// 		if(err) console.log('查询数据失败');
// 		else{
// 			console.log(result);
// 			connection.end();
// 		}
// 	});
// }