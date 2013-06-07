'use strict';

var app = angular.module('clientApp', ['$strap.directives']);

app.config(function ($routeProvider, $locationProvider, $rootScope) {
  
    $routeProvider
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UsersCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    // TODO add api url
    //$rootScope.apiURL = '';

    // $locationProvider.html5Mode(true);

});
