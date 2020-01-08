const r = require('../utils/response')
module.exports = (socket) => {
	socket.on('auth', async (data) => {
		try{
			//console.log(data.secret, process.env);
			console.log(data.secret)
			if(data.secret != process.env.SECRET) throw ''
			socket.secret = data.secret
			socket.emit('response', r('success', 'Sccuessfuly cunnected to socket'))
		}catch(e){
			socket.emit('response', r('failed', 'Invalid secret'))
			console.log("invalid secret")
		}
	})
}
