/**
 * 制作默认的文件结构 
 */
(function(){
	var fs = require('fs');
	//判断当前的文件结构是否为默认结构进行操作
	function checkDefault(){
		if(fs.existsSync('./src')){
			//console.log(exists);
			//如果src存在
			createDefaultDocument();
		}else{
			//如果src不存在
			createDefaultDir();
			createDefaultDocument();
		}
	}
	checkDefault()
	//创建默认文件
	function createDefaultDocument(){
		if(!fs.existsSync('./src/js')){
			fs.mkdirSync('./src/js');
		}
		if(!fs.existsSync('./src/css')){
			fs.mkdirSync('./src/css');
		}
		if(!fs.existsSync('./src/plugins')){
			fs.mkdirSync('./src/plugins');
		}
		if(!fs.existsSync('./src/html')){
			fs.mkdirSync('./src/html');
		}
		if(fs.readdirSync('./src/js').length==0&&fs.readdirSync('./src/plugins').length==0&&fs.readdirSync('./src/html').length==0&&fs.readdirSync('./src/css').length==0){
			fs.writeFileSync('./src/js/index.js',"import '../css/index.css';");
			fs.writeFileSync('./src/css/index.css',"");
			fs.writeFileSync('./src/plugins/hmr.js',`
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
`);
			fs.writeFileSync('./src/html/index.html',`<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<h1>Hello My Friend</h1>
	</body>
</html>
`);
		}
	}
	//初始化文件夹
	function createDefaultDir(){
		fs.mkdirSync('./src')
		fs.mkdirSync('./src/js')
		fs.mkdirSync('./src/css')
		fs.mkdirSync('./src/img')
		fs.mkdirSync('./src/fonts')
		fs.mkdirSync('./src/html')
		fs.mkdirSync('./src/plugins')
	}
	module.exports = checkDefault;
})();
