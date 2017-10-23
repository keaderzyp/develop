module.exports={
	init:function(server){
		var io = require('socket.io').listen(server);
		return io;
	}
}
