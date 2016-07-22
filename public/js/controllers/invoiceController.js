angular.module('mvpApp')
.controller('invoicesController', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
  // Gets called when the directive is ready:

  $scope.init = function() {
    $scope.getCurrentInvoice();
    // $scope.getComments();
    $scope.getInvoices();
    $scope.makeMarkers();
    $scope.getGeo();
  }

  $scope.search = {};

  $scope.location = $stateParams.location;

  $scope.getInvoices = function() {
    $http.get('/api/invoices')
    .then(function(result) {
      $scope.allInvoices = result.data;
    }, function(err) {
      console.log(err)
    });
  }

  $scope.getCurrentInvoice = function() {
    $http.get('/api/invoices/' + $stateParams.id)
    .then(function(result) {
      $scope.currentInvoice = result.data;
      $scope.currentInvoiceGeo($scope.currentInvoice.city)
      $scope.getComments();
    }, function(err) {
      console.log(err)
    });
  }


  }

}]);
