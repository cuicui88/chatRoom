一个简单的客户端与服务端进行通信的例子。
二者通信步骤如下：
	1.html文件打开就表示建立了连接，就会触发websocket.open这个事件。（控制台显示：websocket open；最下面的div区域显示：Connected）
	2.html文件关闭就表示关闭了连接，就会触发websocket.onclose这个事件。（控制台显示:websocket close）
	3.当点击鼠标的时候，程序中调用了websocket.send的方法，那么客户端就会向服务端发送数据。（发送的数据来自于输入文本框的数据）
	4.客户端接收服务端的数据的时候，就会触发wbsocket.onmessage这个事件。（控制台显示的是发送的数据，最下面的div区域显示的也是发送的数据）