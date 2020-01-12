const auth = require('./auth'),
	dataChange = require('./dataChange'),
	tempChange = require('./tempChange')


module.exports = (io, sess) => {
	const browser = io.of('/browser'),
		pi = io.of('/pi')

	io.use(function(socket, next) {
		sess(socket.request, socket.request.res, next);
	});

	browser.use((socket, next) =>{
		console.log(socket.request.session);
		if(socket.request.session._id)	next()
		else socket.disconnect()
	})
	//
	// pi.use((socket, next) => {
	// 	// if(socket.handshake.query.secret != process.env.secret) socket.disconnect()
	// 	// else next()
	// 	console.log('heyo');
	// 	next()
	// })

	browser.on('connection', socket => {
		console.log('Connected to browser namspace');
		dataChange(socket, pi)
	 })

	pi.on('connection', socket => {
		socket.use((data, next) => {
			if(data[0] === 'auth') return next()
			if(socket.secret != process.env.SECRET) return next(new Error())
			return next()
		})
		console.log('Connected to pi namespace');
		auth(socket);
		tempChange(socket, browser)
	})
}
