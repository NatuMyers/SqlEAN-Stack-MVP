angular.module('TripChat')
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
    .state('itineraries', {
      url: '/itineraries',
      controller: 'itinerariesController',
      templateUrl: 'views/partials/itineraries-partial.html',
      params: {location: null}
    })
    .state('showItinerary', {
      url: '/itineraries/:id',
      controller: 'itinerariesController',
      templateUrl: 'views/partials/showItinerary-partial.html'
    })
    .state('itineraries.details', {
      url: '/details/:id',
      controller: 'detailsController',
      templateUrl: 'views/partials/itineraries-partial.details.html'
    })
    .state('user', {
      url: '/:username',
      controller: 'userController',
      templateUrl: 'views/partials/profile-partial.html'
    })

  $locationProvider.html5Mode(true);
}]);
