'use strict';

let User = require('../models/user');

//function that creates new user based on mongoose schema
let create = function(req, res){
  let newUser = new User(req.body);

  newUser.save((err, user) => {
    if(err){
      return res.status(401).send(err);
    } else {
      return res.status(200).json(user);
    }
  });
}
//function that retrieves user data
let get = function(req, res){
  User.find({}, function(err, users){
    // res.send(users);
    res.json({ users: users });
  })
}
//retrieve one user
let getOneUser = function(req, res){
  console.log(req.params);
  User.findOne({ _id: req.params.id }, function(err, user){
    if(err){ throw err };
    console.log(user);
    res.json(user)
  })
}




//function that updates user data
let put = function(req, res){
  let userParams = req;
  console.log(userParams);
  User.findOne({ _id: userParams.id }, function(err, user){
    user.update({
      name: userParams.newName,
      restaurants: []
    }, function(err, user){
      res.send(user);
    });
  });
}
//function that deletes users
let destroy = function(req, res){
  let userParams = req.body;
  User.findOne({ _id: req.params.id }, function(err, user){
    if(err){
      return err
    } else {
      console.log("reqParams:"+req.params.id);
      console.log("reqBod:"+Object.keys(req.body));
      user.remove(function(err){
        res.send({ 'record' : 'deleted' })
      })
    }
  });
}



module.exports = {
  create: create,
  get: get,
  getOneUser: getOneUser,
  put: put,
  destroy: destroy
}
