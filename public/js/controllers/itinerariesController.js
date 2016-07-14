angular.module('TripChat')
.controller('itinerariesController', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
  // Gets called when the directive is ready:

  $scope.init = function() {
    $scope.getCurrentItinerary();
    // $scope.getComments();
    $scope.getItineraries();
    $scope.makeMarkers();
    $scope.getGeo();
  }

  $scope.search = {};

  $scope.location = $stateParams.location;

  $scope.getItineraries = function() {
    $http.get('/api/itineraries')
    .then(function(result) {
      $scope.allItineraries = result.data;
    }, function(err) {
      console.log(err)
    });
  }

  $scope.getCurrentItinerary = function() {
    $http.get('/api/itineraries/' + $stateParams.id)
    .then(function(result) {
      $scope.currentItinerary = result.data;
      $scope.currentItineraryGeo($scope.currentItinerary.city)
      $scope.getComments();
    }, function(err) {
      console.log(err)
    });
  }

  $scope.getComments = function() {
    $http.get('/api/comments?ItineraryId=' + $stateParams.id)
    .then(function(results) {
      $scope.currentItinerary.comments = results.data;
    }, function(err) {
      console.log(err);
    });
  }

  geocoder = new google.maps.Geocoder();

  $scope.comment = {};
  $scope.comment.link = '';

  $scope.addComment = function(itineraryId, city) {
    var lng;
    var lat;

    if($scope.comment.link.substring(0,4) !== 'http' && $scope.comment.link !== '') {
      $scope.comment.link = 'http://' + $scope.comment.link;
    }

    if(!$scope.comment.address) {
      $http.post('/api/comments', {
        text: $scope.comment.text,
        ItineraryId: itineraryId,
        UserId: $scope.user.id,
        address: $scope.comment.address,
        city: city,
        longitude: lng,
        latitude: lat,
        link: $scope.comment.link
      })
      .then(function(results) {
        $scope.comment.text = "";
        $scope.comment.address = "";
        $scope.comment.link = "";
        $scope.getComments();
        $scope.newMarkers();
      }, function(err) {
        console.log(err);
      });
    } else {
      geocoder.geocode({ address: $scope.comment.address}, function (result, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          lat = result[0].geometry.location.lat();
          lng = result[0].geometry.location.lng();
          $http.post('/api/comments', {
            text: $scope.comment.text,
            ItineraryId: itineraryId,
            UserId: $scope.user.id,
            address: $scope.comment.address,
            city: city,
            longitude: lng,
            latitude: lat,
            link: $scope.comment.link
          })
          .then(function(results) {
            $scope.comment.text = "";
            $scope.comment.address = "";
            $scope.comment.link = "";
            $scope.getComments();
            $scope.newMarkers();
          }, function(err) {
            console.log(err);
          });
        } else {
          console.log(status);
        }
      });
    }
    
  }

  $scope.deleteComment = function(commentId) {
    $http.delete('/api/comments/' + commentId)
    .then(function(result) {
      $scope.getComments();
      $scope.newMarkers();
    })
  }



/* ============================================================
  MAP STUFF
==================================================*/

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

    if($stateParams.location) {
      geocoder.geocode({ address: $stateParams.location}, function (result, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          $scope.map.center = {
            latitude: result[0].geometry.location.lat(),
            longitude: result[0].geometry.location.lng()
          }
          $scope.search.city = $stateParams.location;
        }
      });
    } else {
      $scope.map.center = {
        latitude: 40.7128,
        longitude: -74.0059
      }
    }
  }

  $scope.filterGeo = function() {
    geocoder.geocode({ address: $scope.search.city}, function (result, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        $scope.map.center = {
          latitude: result[0].geometry.location.lat(),
          longitude: result[0].geometry.location.lng()
        }
        $scope.newMarkers();
      }
    });
  }

  $scope.makeMarkers = function() {
    $scope.map.markers = [];
    $http.get('/api/comments?location=' + $stateParams.location)
      .then(function(result) {
        var markers = [];
        result.data.forEach(function(element, index) {
          var marker = {
            coords: {
              latitude: element.latitude,
              longitude: element.longitude
            },
            id: element.id,
            title: element.text,
            address: element.address,
            link: element.link,
            options: {
              animation: google.maps.Animation.BOUNCE
            }
          }
          $scope.map.markers.push(marker);
        });
      }, function(err) {
        console.log(err);
    });
  }

  $scope.newMarkers = function() {
    $scope.map.markers = [];
    $http.get('/api/comments?location=' + $scope.search.city)
      .then(function(result) {
        var markers = [];
        result.data.forEach(function(element, index) {
          var marker = {
            coords: {
              latitude: element.latitude,
              longitude: element.longitude
            },
            id: element.id,
            title: element.text,
            address: element.address,
            link: element.link,
            options: {
              animation: google.maps.Animation.BOUNCE
            }
          }
          $scope.map.markers.push(marker);

        });
      }, function(err) {
        console.log(err);
    });
  }

  $scope.hoverGeo = function(city) {
    geocoder.geocode({ address: city}, function (result, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        $scope.map.center = {
          latitude: result[0].geometry.location.lat(),
          longitude: result[0].geometry.location.lng()
        }
        console.log($scope.map.center);
        $scope.hoverMarkers(city);
      }
    });
  }

  $scope.hoverMarkers = function(city) {
    $scope.map.markers = [];
    $http.get('/api/comments?location=' + city)
      .then(function(result) {
        var markers = [];
        result.data.forEach(function(element, index) {
          var marker = {
            coords: {
              latitude: element.latitude,
              longitude: element.longitude
            },
            id: element.id,
            title: element.text,
            address: element.address,
            link: element.link,
            options: {
              animation: google.maps.Animation.BOUNCE
            }
          }
          $scope.map.markers.push(marker);

        });
      }, function(err) {
        console.log(err);
    });
  }

/* ================================================================
  CURRENT ITINERARY
  =================================================================*/

  $scope.currentItineraryGeo = function(city) {
    geocoder.geocode({ address: city}, function (result, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        $scope.map.center = {
          latitude: result[0].geometry.location.lat(),
          longitude: result[0].geometry.location.lng()
        }
        $scope.currentItineraryMarkers();
      }
    });
  }

  $scope.currentItineraryMarkers = function() {
    $scope.map.markers = [];
    $http.get('/api/comments?ItineraryId=' + $stateParams.id)
      .then(function(result) {
        var markers = [];
        result.data.forEach(function(element, index) {
          var marker = {
            coords: {
              latitude: element.latitude,
              longitude: element.longitude
            },
            id: element.id,
            title: element.text,
            link: element.link,
            address: element.address,
            options: {
              animation: google.maps.Animation.BOUNCE
            }
          }
          $scope.map.markers.push(marker);

        });
      }, function(err) {
        console.log(err);
    });
  }

  $scope.onClick = function(marker, eventName, model) {
      model.show = !model.show;
  };

}]);
