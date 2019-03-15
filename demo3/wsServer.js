var ws = require("nodejs-websocket");


var clientCount=0;
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {//每打开一个html页面回调函数的操作就执行一次，新建服务器的操作只执行一次
	console.log("New connection");
	clientCount++;
	conn.nickName = "user"+clientCount;
	broadcast(conn.nickName+" come in");
	conn.on("text", function (str) {//当服务器受到客户端的内容时，将其广播给所有连接
		console.log("Received "+str);
		broadcast(str);
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed");
		broadcast(conn.nickName+" left");
	})
	//当index.html文件关闭的时候会报错，就会执行这个语句
	conn.on("error",function(err){
		console.log("handle err");
		console.log(err);
	})
}).listen(8000,"127.0.0.1");
console.log("websocket server listening on port 8000");
function broadcast(str){//对每一个连接，也就是每一个html页面，执行发送消息的操作
	server.connections.forEach(function(connection){
		connection.sendText(str);
	})
}