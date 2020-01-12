const _ = require('lodash'),
	Term = require('../models/term'),
	changeStatus = require('../utils/changeStatus'),
	r = require('../utils/response')

module.exports = (socket, pi) => {
	socket.on('dataChange', async (data) => {
		try{

			//validations
			if(!socket.request.session._id) throw 'Invalid user'
			if(typeof data == 'undefined') throw 'No body is provided'
			const info = _.pick(data, ['tempNeed', 'status', 'manual', 'high', 'low'])
			if(_.isEmpty(info)) throw 'No body is provided'

			const term = await Term.findOne({user: socket.request.session._id})
			if(!term) throw 'Error, contact someone'
			//manipulations

			if(info.hasOwnProperty('manual')){
				console.log('manual changing');
				if(typeof info.manual != 'boolean') throw 'Manual must be boolean'
				if(info.manual != term.manual) term.manual = info.manual
			}
			if(!term.manual){
				if(info.hasOwnProperty('tempNeed')){
					term.tempNeed = info.tempNeed;
					changeStatus(term, pi)
				}
				if(info.hasOwnProperty('high')){
					term.high = info.high;
					changeStatus(term, pi)
				}
				if(info.hasOwnProperty('low')){
					term.low = info.low
					changeStatus(term, pi)
				}
			}else{
				if(info.hasOwnProperty('status')){
					if(typeof info.status != 'boolean') throw 'Status must be boolean'
					if(info.status != term.status){
						term.status = info.status
						pi.emit('status', {status: term.status})
					}
				}
			}
			await term.save()



			socket.emit('response', 'Success')
		}catch(e){
			console.log(e);
			if(e.message) e = e.message
			socket.emit('response', r('failed', e))
		}
	})
}
