angular.module('mvpApp')
.directive('smallMap', function () {
  return {
    restrict: 'A',
    scope: {
      city: '='
    },
    templateUrl: '/views/directives/smallMap.html',
    controller: function($scope, $http) {

      $scope.map = {
        center: {
          latitude: 40.7128,
          longitude: -74.0059
        },
        zoom: 12,
        options: {
          scrollwheel: false,
          draggable: true,
          zoomControl: true,
          fullscreenControl: true
        },
        markers: []      
      };

      geocoder = new google.maps.Geocoder();

      $scope.getGeo = function() {
        geocoder.geocode({ address: $scope.city}, function (result, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            $scope.map.center = {
              latitude: result[0].geometry.location.lat(),
              longitude: result[0].geometry.location.lng()
            }
            console.log($scope.map.center);
          }
        });
      }

      $scope.getGeo();
    }
  }
});