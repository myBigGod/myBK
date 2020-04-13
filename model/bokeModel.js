const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BokeSchema = new Schema({
  type: {
    type: String
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  star:{
    type:Number
  },
  author:{
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Boke = mongoose.model('bokes', BokeSchema);
