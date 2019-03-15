var ws = require("nodejs-websocket");

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {//表示在127.0.0.1:8000创建服务器
	//这个函数中表示服务端和客户端建立连接的时候执行的代码
	console.log("New connection");
	conn.on("text", function (str) {//当服务端收到客户端的数据的时候调用
		console.log("Received "+str);
		conn.sendText(str.toUpperCase()+"!!!");//服务端向客户端发送数据
	})
	conn.on("close", function (code, reason) {//服务端或者客户端关闭的时候调用，也就是连接关闭的时候调用
		console.log("Connection closed");
	})
	//当index.html文件关闭的时候会报错，就会执行这个语句
	conn.on("error",function(err){
		console.log("handle err");
		console.log(err);
	})
}).listen(8000,"127.0.0.1");
console.log("websocket server listening on port 8000");