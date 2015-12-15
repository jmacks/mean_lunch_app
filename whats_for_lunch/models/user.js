'use strict';
//requirements
const mongoose = require('mongoose');


let User = new mongoose.Schema({
  name: String,
  password: String,
  workZip: Number,
  homeZip: Number,
  restaurants: []
});





module.exports = mongoose.model('User', User);
