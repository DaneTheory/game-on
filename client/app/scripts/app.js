'use strict';

var app = angular.module('football94', ['ngCookies', '$strap.directives']);

app.config(function ($routeProvider, $httpProvider, $locationProvider) {

	$httpProvider.interceptors.push('AuthenticationInterceptor');

	$routeProvider
		.when('/signin', {
			templateUrl: 'views/SignInView.html',
			controller: 'AuthenticationCtrl',
			requireAuthentication: false
		})
		.when('/signup', {
			templateUrl: 'views/signup.html',
			controller: 'AuthenticationCtrl',
			requireAuthentication: false
		})
		.when('/player', {
			templateUrl: 'views/players.html',
			controller: 'PlayersController'
		})
		.when('/player/:playerId', {
			templateUrl: 'views/player.html',
			controller: 'PlayerController'
		})
		.when('/venue', {
			templateUrl: 'views/venues.html',
			controller: 'VenuesController'
		})
		.when('/venue/l/:lat/:lon', {
			templateUrl: 'views/venues.html',
			controller: 'VenuesController'
		})
		.when('/match', {
			templateUrl: 'views/matches.html',
			controller: 'MatchesController'
		})
		.when('/match/:matchId', {
			templateUrl: 'views/matche.html',
			controller: 'MatchController'
		})
		.otherwise({ redirectTo: '/' });

});

app.factory('AuthenticationInterceptor', function ($q) {
    return {
        response: function (response) {
            // do something on success
            return response;
        },
        responseError: function (response) {
            // do something on error
            if (response.status == 401) {
            	// /AuthenticationService.signOut();
            }
            return $q.reject(response);
        }
    };
});

app.run(function ($rootScope, $location, $cookieStore) {

	// Register listener to watch route changes.
	$rootScope.$on('$routeChangeStart', function (event, next, current) {
		if (!$cookieStore.get('username')) {
			if (!(next.$$route.requireAuthentication === false)) {
				$location.path('/');
			}
		}
	});

});