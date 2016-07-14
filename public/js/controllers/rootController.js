angular.module('TripChat')
.controller('rootController', ['$scope', '$http', function ($scope, $http) {
  // Gets called when the directive is ready:
  geocoder = new google.maps.Geocoder();

  $scope.getLatestItinerary = function() {
    $http.get('/api/itineraries?sort=-createdAt')
    .then(function(result) {
      $scope.latestItinerary = result.data[0];
      $scope.getComments($scope.latestItinerary.id);
    }, function(err) {
      console.log(err)
    });
  }

  $scope.getComments = function(itineraryId) {
    $http.get('/api/comments?ItineraryId=' + itineraryId)
    .then(function(results) {
      $scope.comments = results.data;
    }, function(err) {
      console.log(err);
    });
  }

  $scope.addComment = function(itineraryId, city) {
    var lng;
    var lat;
    geocoder.geocode({ address: $scope.address}, function (result, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        lat = result[0].geometry.location.lat();
        lng = result[0].geometry.location.lng();
        $http.post('/api/comments', {
          text: $scope.newComment,
          ItineraryId: itineraryId,
          UserId: $scope.user.id,
          address: $scope.address,
          city: city,
          longitude: lng,
          latitude: lat
        })
        .then(function(results) {
          console.log(results.data);
          $scope.newComment = '';
          $scope.comments.push(results.data);
        }, function(err) {
          console.log(err);
        });
      }
    });
  }

  $scope.getLatestItinerary();
}]);
