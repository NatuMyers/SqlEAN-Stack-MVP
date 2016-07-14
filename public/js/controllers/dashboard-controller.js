angular.module("TripChat")
.controller('dashboardCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.init = function() {
    setTimeout(function() {
      $scope.checkAuthentication();
      $scope.getUserItineraries();
      $scope.getItineraries();
    },100);
  }

  $scope.getUserItineraries = function() {
    $http.get('/api/itineraries?UserId=' + $scope.user.id)
    .then(function(result) {
      $scope.userItineraries = result.data;
      for(var i = 0; i < $scope.userItineraries.length; i++) {
        $scope.userItineraries[i].newActivity = {};
      }
    }, function(err) {
      console.log(err)
    });
  };

  $scope.addItinerary = function(){
    $http.post("/api/itineraries", {
      title:$scope.itinerary.title,
      city: $scope.itinerary.city,
      state: $scope.itinerary.state,
      country: $scope.itinerary.country,
      description: $scope.itinerary.description,
      UserId: $scope.user.id
    })
    .then(function (result) {
      $scope.userItineraries.push(result.data);
      $scope.itinerary.title = "";
      $scope.itinerary.city = "";
      $scope.itinerary.state = "";
      $scope.itinerary.country = "";
      $scope.itinerary.description = "";
     },function(err) {
      console.log(err)
    });
  };

  $scope.deleteItinerary = function(itineraryId){
    $http.delete("/api/itineraries/" + itineraryId)
    .then(function (result) {
      $scope.getUserItineraries();
     }), (function(err) {
      console.log(err);
    });
  };

  $scope.editItinerary = function(itinerary) {
    $http.put('/api/itineraries/' + itinerary.id, {
      title: itinerary.title,
      city:itinerary.city,
      state:itinerary.state,
      country:itinerary.country,
      description:itinerary.description
    });
  };

  $scope.addActivity = function(itineraryId, newActivity){
    newActivity.ItineraryId = itineraryId;
    $http.post("/api/activities", newActivity)
    .then(function (result) {
      $scope.getUserItineraries();
     }), (function(err) {
      console.log(err);
    });
  };

  $scope.deleteActivity = function(activityId){

    $http.delete("/api/activities/" + activityId)
    .then(function (result) {
      // $scope.getUserItineraries();

     }), (function(err) {
      console.log(err);
    });
  };

  //FOR SEARCH PARTIAL WHEN COMPLETED
  $scope.getItineraries = function() {
    $http.get('/api/itineraries')
      .then(function(result) {
        $scope.allItineraries = result.data;
      }, function(err) {
        console.log(err)
      });
    }
  $scope.getItineraries();

  // Block users from going to dashboard page when not logged in.
  $scope.checkAuthentication = function() {
    if(!angular.isDefined($scope.user.id)) {
      $location.path('/');
    }
  };
}]);
