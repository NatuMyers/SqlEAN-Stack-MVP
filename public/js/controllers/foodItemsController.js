angular.module('mvpApp')
.controller('foodItemsController', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
  // Gets called when the directive is ready:

  $scope.init = function() {
    $scope.getCurrentItem();
	$scope.getfoodItems();
  }

  $scope.search = {};

  $scope.location = $stateParams.location;

  $scope.getfoodItems = function() {
    $http.get('/api/foodItems')
    .then(function(result) {
      $scope.allfoodItems = result.data;
    }, function(err) {
      console.log(err)
    });
  }

  $scope.getCurrentItem = function() {
    $http.get('/api/foodItems/' + $stateParams.id)
    .then(function(result) {
      $scope.currentItem = result.data;
      $scope.currentItemGeo($scope.currentItem.city)
      $scope.getComments();
    }, function(err) {
      console.log(err)
    });
  }
