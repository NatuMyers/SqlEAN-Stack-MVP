angular.module('mvpApp')
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
      $http.get('/api/items/?UserId=' + $scope.userData.id)
      .then(function(items) {

        $scope.userItems = items.data;

        $scope.userItems.forEach(function(item) {

          item.Comments.map(function(comment) {

            $http.get('/api/users/' + comment.UserId)
            .then(function(user) {
              comment.username = user.data.username;
              comment.email = user.data.email;
            })
            .then(function() {
              // console.log($scope.userItems);
            })
          })
        })
      })
    })
  }


  $scope.addUserLoc = function(){
    $http.post("/api/items", {
      title:$scope.item.title,
      availibi: $scope.item.city,
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
