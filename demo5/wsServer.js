//服务端绑定http实例
var app = require("http").createServer();
var io = require("socket.io")(app);

app.listen(8000);
//服务端监听连接状态：io的connection事件表示客户端与服务端成功建立连接
//它接收一个回调函数，回调函数会接收一个socket参数。
io.on("connection",function(socket){
    socket.emit("news",{hello:"world"});//服务器向浏览器发送数据
	//但是如果调用io.emit，就是广播了，双方都能收到消息了
    socket.on("my other event",function(data){//服务器接收到相应的数据后执行的操作
        console.log(data);
    });
});