'use strict';

angular.module('Users', [])
       .controller('UsersController', UsersController);

UsersController.$inject = ['$http'];

function UsersController($http){
  let self = this;

  self.all = [];
  self.addUser = addUser;
  self.getUser = getUser;
  self.deleteUser = deleteUser;
  self.newUser = {};

  getUser();

  //aaannnddd the functions!
  function getUser(){
    $http
      .get('http://localhost:3000/user')
      .then(function(response){
        self.all = response.data.users;
      });
  }

  function addUser(){
    $http
      .post('http://localhost:3000/user', self.newUser)
      .then(function(response){
        getUser();
      });
      self.newUser = {};
  }

  function deleteUser(user){
    console.log("user deleted");
    console.log(user);
    $http
      .delete('http://localhost:3000/user/'+ user._id)
      .then(function(response){
        let index = self.all.indexOf(user);
        self.all.splice(index, 1);
      });
  }






}
