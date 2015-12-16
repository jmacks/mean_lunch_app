'use strict';
//global requirements
const express = require('express');
let app = express();

const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');



const routes = require('./routes/user.js');

//use this shit
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use(routes);

//connect to mongo database
// mongoose.connect('mongodb://localhost/whatsForLunch', function(err){
//   if(err){
//     console.log('there is a CONNECTION ERROR to the DATABASE');
//   } else {
//     console.log('We\'ve Successfully Connected to the Database!!!')
//   }
// });
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds033125.mongolab.com:33125/whatsforlunch', function(err){
  if(err){
    console.log('there is a CONNECTION ERROR to the DATABASE');
  } else {
    console.log('We\'ve Successfully Connected to the Database!!!')
  }
});
const db = mongoose.connection;







//server listener
const server = app.listen(3000, function(){
  console.log('Whats for Lunch is Running on Port 3000')
});
