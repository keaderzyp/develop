module.exports = {
	init:function(server){
		//创建默认源码结构
		require('./makeDefaultDir.js')();
		//检测开发者创建的界面文件并生成文件结构和初始内容
		//引入界面配置文件
		var pages = require('../page.config.js');
		require('./makeUserDir.js').initPages(pages);
		var fs = require('fs');
		//监听pages文件变化
		let checkFileDirectories = './page.config.js';
		let oldFile=null;
		//文件监听，当修改pages配置文件的时候自动创建新增的界面文件
		fs.watch(checkFileDirectories,function(e,filename) {
			//console.log(e,filename);
			if(e=='change'){
				console.log('rewirte');
				var data = fs.readFileSync('./page.config.js');
				var dataSource = data.toString().substring(data.toString().indexOf('=')+1);
				require('./makeUserDir.js').initPages(JSON.parse(JSON.stringify(dataSource)));
			}
		})
		//自动刷新的io对象
		var io = require('./socket.js').init(server);
		//webpack对象
		var webpack = require('webpack');
		//引入webpack配置文件
		var webpackConfig = require('../webpack.config.js');
		//启动webpack
		console.log(compiler);
		var compiler = webpack(webpackConfig,function(err,res){
			console.log(res.toString({
				colors:true
			}));
			//如果是生产环境就开启监听模式
			if(process.env.NODE_ENV == 'dev'){
				const watching = compiler.watch({
				  aggregateTimeout:300,
				  poll:undefined
				}, function(err,res){
					io.sockets.emit('refresh');
					console.log('更新成功')
				});
			}
		})
		
	}
}
