const _ = require('lodash'),

	r = require('../utils/response'),

 	User = require('../models/user')

exports.reg = async(req, res) => {
	const body = _.pick(req.body, ['username', 'password'])
	try{
		const doc = await User.findOne({username: body.username})
		if(doc) throw 'User already exists'

		const user = new User(body)
		await user.save()
		console.log(user);

		res.send(r('success', 'User added successfully'))
	}catch(e){

		console.log(e);
		if(e.message) e = e.message
		return res.status(400).send(r('failed', e))
	}

}

exports.check = (req, res) => {
	if(req.session._id) res.send(r('success', 'Logged in'))
	else res.send(r('failed', 'Not logged in'))
}

exports.auth = async(req, res) => {
	const body = _.pick(req.body, ['username', 'password'])

	try{
		const result = await User.auth(body.username, body.password)
		if(result.status) throw result
		if(!result._id) throw result

		req.session._id = result._id
		res.send(result)
	}catch(e){
		console.log(e);
		if(e.message) e = e.message
		return res.status(400).send(r('failed', e))
	}
}

exports.logout = async(req, res) => {
	if(req.session){
		req.session.destroy(function(e){
			if(e) res.status(400).send(e)
			res.send(r('success', 'You\'re logged out'))
		})
	}else res.send(r('failed', 'You\'re not logged in'))
}
