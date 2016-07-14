angular.module('TripChat')
.controller('userController', ['$scope', '$http', '$stateParams', 'md5', function ($scope, $http, $stateParams, md5) {
  // Gets called when the directive is ready:

  $scope.init = function() {
    $scope.getUserProfile();
  };

  $scope.getUserProfile = function() {
    $http.get('/api/users?username=' + $stateParams.username)
    .then(function(user) {
      $scope.userData = user.data[0];
      $scope.getUserComments($scope.userData.id);
      $http.get('/api/itineraries/?UserId=' + $scope.userData.id)
      .then(function(itineraries) {

        $scope.userItineraries = itineraries.data;

        $scope.userItineraries.forEach(function(itinerary) {

          itinerary.Comments.map(function(comment) {

            $http.get('/api/users/' + comment.UserId)
            .then(function(user) {
              comment.username = user.data.username;
              comment.email = user.data.email;
            })
            .then(function() {
              // console.log($scope.userItineraries);
            })
          })
        })
      })
    })
  }

  $scope.getUserComments = function(id) {
    $http.get('/api/comments?UserId=' + id)
    .then(function(result) {
      $scope.userComments = result.data;
      $scope.numberOfComments = $scope.userComments.length;
    }, function(err) {
      console.log(err);
    });
  }; // end getUserComments
}]);
