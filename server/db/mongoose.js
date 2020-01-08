const mongoose = require('mongoose');
require('dotenv').config()

mongoose.set('useMongoClient', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.Promise = global.Promise;
try{
	mongoose.connect(process.env.MONGO_URI);
}catch(e){
	console.log(e);
}

module.exports ={
	mongoose
}
