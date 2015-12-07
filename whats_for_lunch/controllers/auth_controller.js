'use strict';


let User = require('../models/user');
let jwt = require('jsonwebtoken');
let secret = 'pockyisthebestcandy';


let post = function(req, res){
  User.findOne({
    name: req.body.name
  }, function(err, user){
    if(err) throw err;

    if(!user){
      res.json({success: false, message: "authentification failed"})
    } else if (user) {
      if(user.password != req.body.password){
        res.json({success: false, message: "password does not match user name"})
      } else{
        console.log('succesfully logged in');
        var token = jwt.sign(user, secret, {expiresIN: 9999999999});
        console.log(token);
        res.json({
          success: true,
          message: 'Authorized',
          token: token
        })
      }
    }
  })
};


let varify = function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access'];

  if(token){
    jwt.verify(token, secret, function(err, decoded){
      if(err){
        return res.json({success: false, message: "token not authenticated"});
      } else {
        req.decoded = decoded;
        next();
      }
    })
  } else{
    return res.status(403).send({
      success: false,
      message: "no token"
    })
  }
}




module.exports = {
  post: post,
  varify: varify
}
