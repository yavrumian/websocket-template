const r = require('../utils/response'),
    Term = require('../models/term'),
    changeStatus = require('../utils/changeStatus')


module.exports = (socket, browser) => {
	socket.on('tempChange', async (data) => {
		try{
            if(!data._id) throw 'Invalid _id'
            const term = await Term.findOneAndUpdate({_id: data._id}, {$set: {tempNow: data.temp}})
            if(!term) throw 'Invalid ID'

            changeStatus()

            browser.emit('tempChange', data)
			socket.emit('response', {msg: 'success'})
		}catch(e){
			socket.emit('response', e)
		}
	})
}
