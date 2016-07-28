angular.module("mvpApp")
.controller('orderCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.init = function() {
    setTimeout(function() {
      $scope.checkAuthentication();
      $scope.getUserItems();
      $scope.getItems();
    },100);
  }

  $scope.checkAuthentication = function() {
    if(!angular.isDefined($scope.user.id)) {
      $location.path('/');
    }
  };
}]);
