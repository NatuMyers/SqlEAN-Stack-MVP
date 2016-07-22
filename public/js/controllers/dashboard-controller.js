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

  // Now made the add item function post an Order AND the item
  // the items have Orderid bound to them instead of UserId
  // orderId has userID bound to it as items did
  // TODO strip out useless item parameters

    $scope.getOrderItems = function() {
      $http.get('/api/items?OrderId=' + $scope.order.id)
      .then(function(result) {
        $scope.userOrders = result.data;
        for(var i = 0; i < $scope.userOrders.length; i++) {
          $scope.userOrders[i].newActivity = {};
        }
      }, function(err) {
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

      $http.post("/api/items", {
        title: $scope.item.title,
        city: $scope.item.city,
        state: $scope.item.state,
        country: $scope.item.country,
        description: $scope.item.description,
        OrderId: $scope.order.id
      })
      .then(function (result) {
        $scope.userOrders.push(result.data);
        $scope.item.title = "";
        $scope.item.city = "";
        $scope.item.state = "";
        $scope.item.country = "";
        $scope.item.description = "";
       },function(err) {
        console.log(err)
      });
    };

    //

    // made delete order
    $scope.deleteOrder = function(orderId){
      $http.delete("/api/orders/" + orderId)
      .then(function (result) {
        $scope.getOrderItems(); // get order items is extremely important
       }), (function(err) {
        console.log(err);
      });

      // when you delete order, you have to delete
      // all items associated with it
      // lets assume that happens for now - but i'm not sure tho.
      // if you need a function insert it here------

      // ---
    };

    $scope.deleteItem = function(itemId){
      $http.delete("/api/items/" + itemId)
      .then(function (result) {
        $scope.getOrderItems();
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
