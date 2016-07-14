angular.module('TripChat')
.controller('detailsController', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
  // Gets called when the directive is ready:

  $scope.getComments = function() {
    $http.get('/api/comments?ItineraryId=' + $stateParams.id)
    .then(function(results) {
      $scope.comments = results.data;
    }, function(err) {
      console.log(err);
    });
  }

  $scope.addComment = function(itineraryId) {
    $http.post('/api/comments', {
      text: $scope.newComment,
      ItineraryId: itineraryId,
      UserId: $scope.user.id
    })
    .then(function(results) {
      $scope.newComment = '';
      $scope.comments.push(results.data);
    }, function(err) {
      console.log(err);
    });
  }

}]);
