angular.module('mvpApp')
.factory('userFactory', function($http) {
  return {
    saveUser: function(users) {
      $http.post('/signup', users);
    }
  }
});

