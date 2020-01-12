const mongoose = require('mongoose')

const TermSchema = new mongoose.Schema({
  tempNow: {type: Number, default: 0},
  tempNeed: {type: Number, default: 25},
  status: {type: Boolean, default: false},
  manual: {type: Boolean, default: false},
  high: {type: Number, default: 3},
  low: {type: Number, default: 5},
  user: {type: mongoose.Schema.Types.ObjectID, ref: 'User'}
});

const Term = mongoose.model('Term', TermSchema);
module.exports = Term;
