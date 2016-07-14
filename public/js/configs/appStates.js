angular.module('mvpApp')
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'rootController',
      templateUrl: 'views/partials/home-partial.html'
    })
    .state('dashboard', {
      url: '/dashboard',
      controller: 'dashboardCtrl',
      templateUrl: 'views/partials/dashboard-partial.html'
    })
    .state('items', {
      url: '/items',
      controller: 'itemsController',
      templateUrl: 'views/partials/items-partial.html',
      params: {location: null}
    })
    .state('showItem', {
      url: '/items/:id',
      controller: 'itemsController',
      templateUrl: 'views/partials/showItem-partial.html'
    })
    .state('items.details', {
      url: '/details/:id',
      controller: 'detailsController',
      templateUrl: 'views/partials/items-partial.details.html'
    })
    .state('user', {
      url: '/:username',
      controller: 'userController',
      templateUrl: 'views/partials/profile-partial.html'
    })

  $locationProvider.html5Mode(true);
}]);
