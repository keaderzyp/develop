
//创建hmr节点对象
var hmr = document.createElement('script');
//引入socket文件
hmr.src='/socket.io/socket.io.js';
//查找界面编译后的节点将hmr对象添加在原有节点之前
var scripts = document.querySelector('script');
document.body.insertBefore(hmr,scripts[0]);
//新界面加载完毕在执行监听
window.onload=function(){
	var socket = io.connect();
	socket.on('refresh',function(){
		location.reload();
	})
}
