'use strict';

angular.module('Users', [])
       .controller('FoodController', FoodController);

FoodController.$inject = ['$http'];

function FoodController($http){
  let self = this;

  self.all = [];
  self.getFood = getFood;

  getFood();

  function getFood(){
    $http
      .get("https://api.foursquare.com/v2/venues/search?client_id=D3SET0CHYGC3CASAHZN2KNTLUSQKA0KQMIXARVBKTN5PXXBM&client_secret=P32CRHV34KCIRUB0GAEZAB54NQBVJ3K42R0WC0DKF5MICCUX&v=20130815&ll=40.7,-74&query=sushi")
      .then(function(res){
        self.all = res.response.venues[0]
        // self.all = res.response;
      });
  }





}
