angular.module('mvpApp')
.controller('rootController', ['$scope', '$http', function ($scope, $http) {
  // Gets called when the directive is ready:
  geocoder = new google.maps.Geocoder();

  $scope.getLatestItem = function() {
    $http.get('/api/items?sort=-createdAt')
    .then(function(result) {
      $scope.latestItem = result.data[0];
      $scope.getComments($scope.latestItem.id);
    }, function(err) {
      console.log(err)
    });
  }

  $scope.getComments = function(itemId) {
    $http.get('/api/comments?ItemId=' + itemId)
    .then(function(results) {
      $scope.comments = results.data;
    }, function(err) {
      console.log(err);
    });
  }

  $scope.addComment = function(itemId, city) {
    var lng;
    var lat;
    geocoder.geocode({ address: $scope.address}, function (result, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        lat = result[0].geometry.location.lat();
        lng = result[0].geometry.location.lng();
        $http.post('/api/comments', {
          text: $scope.newComment,
          ItemId: itemId,
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

  $scope.getLatestItem();
}]);
