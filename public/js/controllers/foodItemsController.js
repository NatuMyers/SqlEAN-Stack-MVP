angular.module('mvpApp')
.controller('foodItemsController', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
  // Gets called when the directive is ready:

  $scope.init = function() {
    $scope.getCurrentfoodItem();
    // $scope.getComments();
    $scope.getfoodItems();
  }

  $scope.search = {};
    $scope.addfoodItem = function(){
      $http.post("/api/foodItems", {
        title: $scope.foodItem.title,
        availability: $scope.foodItem.availability,
        UserId: $scope.user.id
      })
      .then(function (result) {
        $scope.userfoodItems.push(result.data);
        $scope.foodItem.title = "";
        $scope.foodItem.availability = "";
       },function(err) {
        console.log(err)
      });
    };

  $scope.getfoodItems = function() {
    $http.get('/api/foodItems')
    .then(function(result) {
      $scope.allfoodItems = result.data;
    }, function(err) {
      console.log(err)
    });
  }

  $scope.getCurrentfoodItem = function() {
    $http.get('/api/foodItems/' + $stateParams.id)
    .then(function(result) {
      $scope.currentfoodItem = result.data;
    }, function(err) {
      console.log(err)
    });
  }



}]);
