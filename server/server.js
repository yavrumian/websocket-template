const {mongoose} = require('./db/mongoose'),
   path = require('path'),
   bodyParser = require('body-parser'),
   cors = require('cors'),
   express = require('express'),

   listen = require('./socketHandlers/listen'),

   port = process.env.PORT,
   app = express(),
   server = require('http').Server(app),
   io = require('socket.io')(server),

   session = require('express-session')({
       secret:process.env.SECRET,
       resave: false,
       saveUninitialized: true,
       cookie: {httpOnly: false, secure: false}
   })

app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(session)
//use global router
app.use(`${process.env.PREFIX}/`, require('./routers/Router'))

//listen to socket
listen(io, session)


server.listen(port, () => {
	console.log(`Server running on port: ${port}`);
})
