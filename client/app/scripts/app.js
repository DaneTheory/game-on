'use strict';

var app = angular.module('clientApp', ['$strap.directives']);

app.config(function ($routeProvider, $locationProvider) {
  
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/users', {
      templateUrl: 'views/users.html',
      controller: 'UsersCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);

});
