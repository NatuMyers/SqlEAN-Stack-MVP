angular.module('mvpApp')
.controller('AppCtrl', function($scope, $rootScope, $http, $state) {

  $scope.signup = function() {
    $http.post('/signup', {
      username: $scope.username,
      password: $scope.password,
      email: $scope.email,
      fname: $scope.fname,
      lname: $scope.lname,
      type: $scope.type
    })
    .then(function(result) {
      //$('.login')
      // After you successfully signup
      $state.go('login'); 
    })
  } // end sign up

  $scope.getLogin = function() {
    $http.get('/loginInfo')
    .then(function(result) {
      $rootScope.user = result.data;
    })
  }

  $scope.login = function() {
    $http.post('/login', {
      username: $scope.username,
      password: $scope.password
    })
    .then(function(result) {
      if(result.status === 401) {
        $scope.alerts = [];
        $scope.alerts.push({msg: 'Oops! Wrong username/password!'});
      } else {
        $scope.getLogin();
        //$('.login').modal('toggle')
        $state.go('dashboard');
      }
    }, function(err) {
      console.log(err);
      $scope.alerts = [];
      $scope.alerts.push({msg: 'Oops! Wrong username/password!'});

    })
  }; // end login

  $scope.logout = function() {
    $http.get('/logout').then(function() {
      $rootScope.user = '';
      $state.go('home');
    }, function(err) {
      console.log(err);
    })
  }; // end logout
  $scope.getLogin();

  $scope.alerts = [];



  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
});
