'use strict';

var app = angular.module('clientApp', ['$strap.directives']);

app.config(function ($routeProvider, $httpProvider, $locationProvider) {
  
    $routeProvider
        .when('/',                  { templateUrl: 'views/login.html',      controller: 'LoginController' })
        
        .when('/signup',            { templateUrl: 'views/signup.html',     controller: 'SignupController' })
        
        .when('/player',            { templateUrl: 'views/players.html',    controller: 'PlayersController' })
        .when('/player/:playerId',  { templateUrl: 'views/player.html',     controller: 'PlayerController' })
        .when('/venue',             { templateUrl: 'views/venues.html',     controller: 'VenuesController' })
        .when('/venue/l/:lat/:lon', { templateUrl: 'views/venues.html',     controller: 'VenuesController' })
        .when('/match',             { templateUrl: 'views/matches.html',    controller: 'MatchesController' })
        .when('/match/:matchId',    { templateUrl: 'views/matche.html',     controller: 'MatchController' })
        .otherwise({ redirectTo: '/' });

    //$locationProvider.html5Mode(true);

});
