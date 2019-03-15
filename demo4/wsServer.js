var ws = require("nodejs-websocket");


var clientCount=0;
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {//每打开一个html页面就执行一次
	console.log("New connection");
	clientCount++;
	conn.nickName = "user"+clientCount;
	//将信息都包装在一个对象里面，包含发生了什么还有相应的数据
	var mes = {};
	mes.type = "enter";
	mes.data = conn.nickName + " come in";
	broadcast(JSON.stringify(mes));
	conn.on("text", function (str) {//当提交text里面的内容这个事件发生的时候，将其广播给所有连接
		console.log("Received "+str);
		var mes = {};
		mes.type = "message";
		mes.data = conn.nickName+" says "+str;
		broadcast(JSON.stringify(mes));
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed");
		var mes = {};
		mes.type = "leave";
		mes.data = conn.nickName+" left";
		broadcast(JSON.stringify(mes));
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