angular.module("mvpApp")
.controller('dashboardCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.init = function() {
    setTimeout(function() {
      $scope.checkAuthentication();
      $scope.getUserItems();
      $scope.getItems();
    },100);
  }

  $scope.getUserItems = function() {
    $http.get('/api/items?UserId=' + $scope.user.id)
    .then(function(result) {
      $scope.userItems = result.data;
      for(var i = 0; i < $scope.userItems.length; i++) {
        $scope.userItems[i].newActivity = {};
      }
    }, function(err) {
      console.log(err)
    });
  };

  $scope.addItem = function(){
    $http.post("/api/items", {
      title:$scope.item.title,
      city: $scope.item.city,
      state: $scope.item.state,
      country: $scope.item.country,
      description: $scope.item.description,
      UserId: $scope.user.id
    })
    .then(function (result) {
      $scope.userItems.push(result.data);
      $scope.item.title = "";
      $scope.item.city = "";
      $scope.item.state = "";
      $scope.item.country = "";
      $scope.item.description = "";
     },function(err) {
      console.log(err)
    });
  };

  $scope.deleteItem = function(itemId){
    $http.delete("/api/items/" + itemId)
    .then(function (result) {
      $scope.getUserItems();
     }), (function(err) {
      console.log(err);
    });
  };

  $scope.editItem = function(item) {
    $http.put('/api/items/' + item.id, {
      title: item.title,
      title: item.availability,
      city:item.city,
      state:item.state,
      country:item.country,
      description:item.description
    });
  };

  $scope.addActivity = function(itemId, newActivity){
    newActivity.ItemId = itemId;
    $http.post("/api/activities", newActivity)
    .then(function (result) {
      $scope.getUserItems();
     }), (function(err) {
      console.log(err);
    });
  };

  $scope.deleteActivity = function(activityId){

    $http.delete("/api/activities/" + activityId)
    .then(function (result) {
      // $scope.getUserItems();

     }), (function(err) {
      console.log(err);
    });
  };

  //FOR SEARCH PARTIAL WHEN COMPLETED
  $scope.getItems = function() {
    $http.get('/api/items')
      .then(function(result) {
        $scope.allItems = result.data;
      }, function(err) {
        console.log(err)
      });
    }
  $scope.getItems();

  // Block users from going to dashboard page when not logged in.
  $scope.checkAuthentication = function() {
    if(!angular.isDefined($scope.user.id)) {
      $location.path('/');
    }
  };
}]);
