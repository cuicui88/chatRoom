var app = require("http").createServer();
var io = require("socket.io")(app);

var clientCount=0;//必须放在监听端口语句的上面，放在下面会出现关掉浏览器之后
//下一次计数会保存的情况
app.listen(8000);

io.on("connection",function(socket){
	clientCount++;
	socket.nickName = "user"+clientCount;
	io.emit("enter",socket.nickName + " come in");

	socket.on("message",function(str){
		io.emit("message",socket.nickName+" says "+str)
	})

	socket.on("disconnect",function(){
		io.emit("leave",socket.nickName+" left")
	})
})
console.log("websocket server listening on port 8000");
