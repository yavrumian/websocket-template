const mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	_ = require('lodash'),

	Term = require('../models/term'),

	saltRounds = 10
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

UserSchema.pre('save', async function(next) {
	const user = this;
	try {
		await new Term({user: user._id}).save()
		const hash = await bcrypt.hash(user.password, saltRounds)
		user.password = hash
		next();
	} catch (e) {
		return next(e)
	}

})



UserSchema.statics.auth = async function(username, password){
	try{
		const user = await User.findOne({username})
		if(!user) throw 'No user found'
		const res = await bcrypt.compare(password, user.password)
		if(res) return _.pick(user, ['_id', 'username'])
		else throw 'Invalid credentials'
	}catch(e){
		console.log(e);
		return e
	}
}

const User = mongoose.model('User', UserSchema);
module.exports = User;
