'use strict';
let TOKEN;
angular.module('Users')
      .factory('SaveRestaurant', function(){
        let restaurantArr = [];
        return restaurantArr;
      })
       .controller('UsersController', UsersController)
       .controller('FoodController', FoodController)
       .controller('AuthController', AuthController)

UsersController.$inject = ['$http', 'SaveRestaurant'];

function UsersController($http, SaveRestaurant){
  let self = this;
  self.all = [];
  self.user = {};
  self.addUser = addUser;
  self.getUser = getUser;
  self.getOne = getOne;
  self.deleteUser = deleteUser;
  self.newUser = {};
  self.addRestaurant = addRestaurant;
  self.saveRestaurant = SaveRestaurant;


  getUser();

  //aaannnddd the functions!
  function getUser(){
    $http
      .get('http://localhost:3000/user' )  //{token: TOKEN}
      .then(function(response){
        self.all = response.data.users;
      });
  }
  //retrieve just one user
  function getOne(user){
    console.log(user);
    $http
      .get('http://localhost:3000/user/' + user._id)
      .then(function(response){
        console.log(response.data);
        self.user = response.data;
      })
    }

  function addRestaurant(user){
    $http
      .put('http://localhost:3000/user/' + self.user._id, {"restaurant": SaveRestaurant[0]})
      .then(function(response){
        self.getOne(response.data);

      })
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

FoodController.$inject = ['$http', 'SaveRestaurant'];

function FoodController($http, SaveRestaurant){
let self = this;

// self.all = [];
self.all = '';
self.address = '';
self.getFood = getFood;
self.foodArr = SaveRestaurant;
getFood();

function getFood(){

  let startPos;
  let geoOptions = {
    maximumAge: 5 * 60 * 1000
  }
   function geoSuccess(position){
    startPos = position;
    var lat = startPos.coords.latitude;
    var lon = startPos.coords.longitude;
    console.log(lat);
    console.log(lon);
    return fourSquareAPI(startPos);
  };
  function geoError(error){
    console.log('geo error code:' + error.code);
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);



  var cuisineArray = ['sushi', 'pizza', 'diner', 'chinese', 'korean', 'tapas', 'sandwich', 'mediterranean', 'burger', 'coffee', 'french', 'italian', 'german', 'spanish', 'mexican', 'filipino', 'russian', 'georgian'];
  var cuisineLength = cuisineArray.length;
  var randomInCuisineArray = Math.floor(Math.random()*cuisineLength);
  var randomCuisine = cuisineArray[randomInCuisineArray];

function fourSquareAPI(data){
$http
.get("https://api.foursquare.com/v2/venues/search?client_id=D3SET0CHYGC3CASAHZN2KNTLUSQKA0KQMIXARVBKTN5PXXBM&client_secret=P32CRHV34KCIRUB0GAEZAB54NQBVJ3K42R0WC0DKF5MICCUX&v=20130815&ll="+data.coords.latitude+","+data.coords.longitude+"&query=" + randomCuisine +"&radius=350")


.then(function(res){
  var venuesLength = res.data.response.venues.length
  var rando = Math.floor(Math.random()* venuesLength)
  console.log(res.data.response.venues[rando].location.address);
  // self.all = res.data.response.venues[rando].name;
  self.all = res.data.response.venues[rando].name;
  self.address = res.data.response.venues[rando].location.address;
  SaveRestaurant = [];
  SaveRestaurant.push({
    name: self.all,
    location: self.address
  })
 // self.all = res.response;
  });
  }
  }
}

AuthController.$inject = ['$http'];

function AuthController($http){
  let self = this;
  self.login = login;
  self.token = TOKEN;

  self.test = "";

  function login(user){
    $http
    .post("http://localhost:3000/authenticate", { name: user.name, password: user.password }).success(function(data, status){
       if(data.token){
        TOKEN = data.token;
        self.token = data.token;//doesnt work
        console.log(data.token);
//testing connection between the dom and controller in login auth scope
        self.test = "Hi " + user.name + " stop thinking and feed yourself";

        alert("Welcome " + user.name + " ,your logged in now GO EAT!");
       }
    });

  }


}
