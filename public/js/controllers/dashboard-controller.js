angular.module("mvpApp")
.controller('dashboardCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {


// Producer

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
    $http.post('/api/items', {
      title: $scope.item.title,
      city: $scope.item.city,
      state: $scope.item.state,
      UserId: $scope.user.id
    })
    .then(function (result) {
      $scope.userItems.push(result.data);
      $scope.item.title = "";
      $scope.item.city = "";
      $scope.item.state = "";
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
      city: item.city,
      state: item.state
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


// Purchaser

// new - make order
$scope.addOrder = function(){
  $http.post('/api/orders', {
    UserId: $scope.user.id
  })
};

// new
$scope.connectItemToOrder = function(orderId) {
  $http.put('/api/items' + item.id, {
    OrderId: orderId
    // OrderId is an attribute of item automatically made in sequelize.
    // it is what the item is bound to
  });
};



// Finally, for both users

  // Block users from going to dashboard page when not logged in.
  $scope.checkAuthentication = function() {
    if(!angular.isDefined($scope.user.id)) {
      $location.path('/');
    }
  };
}]);
