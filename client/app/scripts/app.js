'use strict';

var app = angular.module('clientApp', ['$strap.directives']);

app.config(function ($routeProvider, $locationProvider) {
  
    $routeProvider
        .when('/',                  { templateUrl: 'views/login.html',      controller: 'LoginController' })
        .when('/player',            { templateUrl: 'views/players.html',    controller: 'PlayersController' })
        .when('/player/:playerId',  { templateUrl: 'views/player.html',     controller: 'PlayerController' })
        .when('/venue',             { templateUrl: 'views/venues.html',     controller: 'VenuesController' })
        .when('/venue/:venueId',    { templateUrl: 'views/venue.html',      controller: 'VenueController' })
        .when('/match',             { templateUrl: 'views/matches.html',    controller: 'MatchesController' })
        .when('/match/:matchId',    { templateUrl: 'views/matche.html',     controller: 'MatchController' })
        .otherwise({ redirectTo: '/' });

    // TODO add api url
    //$rootScope.apiURL = '';
    //$locationProvider.html5Mode(true);

});
