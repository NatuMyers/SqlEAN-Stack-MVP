angular.module("mvpApp")
.controller('dashboardCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.init = function() {
    setTimeout(function() {
      $scope.checkAuthentication();
      $scope.getUserItems();
      $scope.getItems();
    },100);
  }

// Items

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

    // order add
    $http.post("/api/orders", {
      title: $scope.item.title,
    })
    .then(function (result) {
      $scope.userOrders.push(result.data);
      $scope.item.title = "";
     },function(err) {
      console.log(err)
    });
  };

    // item add
    $http.post("/api/items", {
      title: $scope.item.title,
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




  // done-
  $scope.addItem = function(){

  $http.post("/api/orders", {
    title: $scope.item.title,
  })
  .then(function (result) {
    $scope.userOrders.push(result.data);
    $scope.item.title = "";
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

  $scope.addActivity = function(itemId, newActivity){
    newActivity.ItemId = itemId;
    $http.post("/api/activities", newActivity)
    .then(function (result) {
      $scope.getUserItems();
     }), (function(err) {
      console.log(err);
    });
  };

// Invoices

$scope.getUserInvoices = function() {
  $http.get('/api/invoices?UserId=' + $scope.user.id)
  .then(function(result) {
    $scope.userInvoices = result.data;
    for(var i = 0; i < $scope.userInvoices.length; i++) {
      $scope.userInvoices[i].newActivity = {};
    }
  }, function(err) {
    console.log(err)
  });
};

$scope.addInvoice = function(){
  $http.post("/api/invoices", {
    title: $scope.invoice.title,
    city: $scope.invoice.city,
    state: $scope.invoice.state,
    country: $scope.invoice.country,
    description: $scope.invoice.description,
    UserId: $scope.user.id
  })
  .then(function (result) {
    $scope.userInvoices.push(result.data);
    $scope.invoice.title = "";
    $scope.invoice.city = "";
    $scope.invoice.state = "";
    $scope.invoice.country = "";
    $scope.invoice.description = "";
   },function(err) {
    console.log(err)
  });
};

$scope.deleteInvoice = function(invoiceId){
  $http.delete("/api/invoices/" + invoiceId)
  .then(function (result) {
    $scope.getUserInvoices();
   }), (function(err) {
    console.log(err);
  });
};

$scope.editInvoice = function(invoice) {
  $http.put('/api/invoices/' + invoice.id, {
    title: invoice.title,
    title: invoice.availability,
    city:invoice.city,
    state:invoice.state,
    country:invoice.country,
    description:invoice.description
  });
};

//FOR SEARCH PARTIAL WHEN COMPLETED
$scope.getInvoices = function() {
  $http.get('/api/invoices')
    .then(function(result) {
      $scope.allInvoices = result.data;
    }, function(err) {
      console.log(err)
    });
  }
$scope.getInvoices();





  $scope.deleteActivity = function(activityId){

    $http.delete("/api/activities/" + activityId)
    .then(function (result) {
      // $scope.getUserItems();

     }), (function(err) {
      console.log(err);
    });
  };



  // Block users from going to dashboard page when not logged in.
  $scope.checkAuthentication = function() {
    if(!angular.isDefined($scope.user.id)) {
      $location.path('/');
    }
  };
}]);
