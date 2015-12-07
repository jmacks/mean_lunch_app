'use strict';
let TOKEN;
angular.module('Users', [])
       .controller('UsersController', UsersController)
       .controller('FoodController', FoodController)
       .controller('AuthController', AuthController)

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
      .get('http://localhost:3000/user' )  //{token: TOKEN}
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


//
// .controller('FoodController', FoodController);

FoodController.$inject = ['$http'];

function FoodController($http){
let self = this;

// self.all = [];
self.all = '';
self.getFood = getFood;

getFood();

function getFood(){
  var cuisineArray = ['sushi', 'pizza', 'diner', 'american', 'chinese', 'korean', 'tapas', 'sandwich', 'mediterranean', 'burger', 'coffee', 'french', 'italian', 'german', 'spanish', 'mexican'];
  var cuisineLength = cuisineArray.length;
  var randomInCuisineArray = Math.floor(Math.random()*cuisineLength);
  var randomCuisine = cuisineArray[randomInCuisineArray];
$http
.get("https://api.foursquare.com/v2/venues/search?client_id=D3SET0CHYGC3CASAHZN2KNTLUSQKA0KQMIXARVBKTN5PXXBM&client_secret=P32CRHV34KCIRUB0GAEZAB54NQBVJ3K42R0WC0DKF5MICCUX&v=20130815&ll=40.7,-74&query=" + randomCuisine)

.then(function(res){
  var venuesLength = res.data.response.venues.length
  var rando = Math.floor(Math.random()* venuesLength)
  console.log(res.data.response.venues[rando].name);
  self.all = res.data.response.venues[rando].name;
  // self.all = res.data.response.venues.name;

 // self.all = res.response;
});
}

}

AuthController.$inject = ['$http'];

function AuthController($http){
  let self = this;
  self.login = login;

  function login(user){
    $http
    .post("http://localhost:3000/authenticate", { name: user.name, password: user.password }).success(function(data, status){
       if(data.token){
       TOKEN = data.token;
        console.log(data.token);
        alert("login successful");
       }
    });

  }


}
