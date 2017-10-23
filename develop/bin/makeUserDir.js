//根据用户的配置文件生成文件结构
module.exports={
	initPages:function (pages){
		console.log(pages);
		if(typeof pages == 'string'){
			//转成json格式
			pages = JSON.parse('"'+pages.replace(/\s+/g,'')+'"');
			//强制转换成json类型
			pages =  eval('('+pages+')');
			console.log(pages);
		}
		
		var fs = require('fs');
		for( item in pages){
			if(!fs.existsSync('./src/js/'+item+'.js')&&
			   !fs.existsSync('./src/css/'+item+'.css')&&
			   !fs.existsSync('./src/html/'+item+'.html')){
			   	fs.writeFileSync('./src/js/'+item+'.js',"import '../css/"+item+".css';");
				fs.writeFileSync('./src/css/'+item+'.css',"");
				fs.writeFileSync('./src/html/'+item+'.html',`<!DOCTYPE html>
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
	}
}
