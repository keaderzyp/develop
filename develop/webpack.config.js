var htmlWebpackPlugin = require('html-webpack-plugin');
var extractWebpackPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var config = {
	entry:{
		//加载hmrjs的源码
		hmr:'./src/plugins/hmr.js',
	},
	output:{
		filename:'js/[name].js',
		path:path.join(__dirname,'public')
		//publicPath:'http://localhost:3000'
	},
	externals: {
	  'vue': 'Vue',
	  'vue-router':'VueRouter',
	  'VueResource':'VueResource'
	},
	module:{
		rules:[
			{
				test:/\.(gif|jpeg|jpg|png)\??.*$/,
				loader:'url-loader?limit=1000&name=img/[name].[ext]'
			},
			{
				test:/\.(woff|svg|eot|ttf)\??.*$/,
				loader:'url-loader?limit=1000&name=fonts/[name].[ext]'
			},
			{
				test:/\.html$/,
				loader:'html-loader'
			},
			{
				test:/\.js$/,
				loader:'babel-loader'
			}
		]
	},
	plugins:[
		new extractWebpackPlugin('css/[name].css'),
	]
}
//如果是生产环境就加入自动打开浏览器,编译正常的css文件
if(process.env.NODE_ENV=='dev'){
	config.plugins.unshift(new OpenBrowserPlugin({ url: 'http://localhost:3000/index' }));
	config.module.rules.unshift({
				test:/\.css$/,
				loader:extractWebpackPlugin.extract({
					fallback:'style-loader',
					use:'css-loader!postcss-loader'
				})
		});
}
//如果是发布环境就加入代码压缩
if(process.env.NODE_ENV=='build'){
	config.module.rules.unshift({
				test:/\.css$/,
				loader:extractWebpackPlugin.extract({
					fallback:'style-loader',
					use:[{
						loader:'css-loader',
						options:{minimize:true}
					},'postcss-loader']
				})
		});
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}
var jsDocs = fs.readdirSync('./src/js');
for(var i=0;i<jsDocs.length;i++){
	var chunk = jsDocs[i].substring(0,jsDocs[i].lastIndexOf('.'));
	config.entry[chunk]='./src/js/'+chunk+'.js';
	//如果是发布环境就只加载本页的chunk
	if(process.env.NODE_ENV=='build'){
		config.plugins.push(new htmlWebpackPlugin({
			filename:chunk+'.html',
			template:'./src/html/'+chunk+'.html',
			chunks:[chunk]
		}))
	}
	//如果是生产环境就加载hmr
	if(process.env.NODE_ENV=='dev'){
		config.plugins.push(new htmlWebpackPlugin({
			filename:chunk+'.html',
			template:'./src/html/'+chunk+'.html',
			chunks:[chunk,'hmr']
		}))
	}
	
}
module.exports=config;
