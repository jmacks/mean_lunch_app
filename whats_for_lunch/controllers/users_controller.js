'use strict';

const User = require('../models/user');

//function that creates new user based on mongoose schema
let create = function(req, res){
  let newUser = new User(req.body.user);

  newUser.save((err, user) => {
    if(err){
      return res.status(401).send(err);
    } else {
      return res.status(200).send(user);
    }
  });
}
//function that retrieves user data
let get = function(req, res){
  User.find({}, function(err, users){
    res.send(users);
  })
}
//function that updates user data
let put = function(req, res){
  let
}
