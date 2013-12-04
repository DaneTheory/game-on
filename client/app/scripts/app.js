//
// # GameOn (Inspired by jogabo.com)
// `GameOn` connects you with the players in your city and
// allows you to find, organize and share games effortlessly.
// 
// 2013 Pablo De Nadai
//

'use strict';

var app = angular.module('gameOn', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'ngAnimate',
	'ngTouch'
]);

// TODO: Use Grunt to set this values depending on build profile.
app.constant('ServerUrl', '//localhost:3000');
app.constant('ApiUrl', '//localhost:3000/api/1');

app.config(function ($routeProvider, $httpProvider) {

	// Add `AuthenticationInterceptor` to check if the `Player` is still Signed In.
	$httpProvider.interceptors.push('AuthenticationInterceptor');

	// Add `withCredentials` header to requests. (CORS requirement)
	$httpProvider.defaults.withCredentials = true;

	// Google Maps Style
	google.maps.visualRefresh = true;

	// Routing.
	$routeProvider
		.when('/', {
			templateUrl: 'views/main/MainView.html',
			controller: 'MainCtrl',
			requireAuthentication: false
		})
		.when('/player/edit', {
			templateUrl: 'views/player/PlayerEditView.html',
			controller: 'PlayerEditCtrl'
		})
		.when('/player/:playerId', {
			templateUrl: 'views/player/PlayerView.html',
			controller: 'PlayerCtrl'
		})
		.when('/venue/new', {
			templateUrl: 'views/venue/VenueNewView.html',
			controller: 'VenueNewCtrl'
		})
		.when('/match/new', {
			templateUrl: 'views/match/MatchNewView.html',
			controller: 'MatchNewCtrl'
		})
		.when('/search', {
			templateUrl: 'views/search/SearchView.html',
			controller: 'SearchCtrl',
			reloadOnSearch: false
		})
		.when('/auth/signin', {
			templateUrl: 'views/authentication/SignInView.html',
			controller: 'AuthenticationCtrl',
			requireAuthentication: false
		})
		.when('/auth/signup', {
			templateUrl: 'views/authentication/SignUpView.html',
			controller: 'AuthenticationCtrl',
			requireAuthentication: false
		})
		.when('/auth/facebook', {
			templateUrl: 'views/authentication/FacebookView.html',
			controller: 'AuthenticationCtrl',
			requireAuthentication: false
		})
		.otherwise({
			redirectTo: '/',
			requireAuthentication: false
		});

});

app.run(function ($rootScope, $location, AuthenticationModel) {

	// Register listener to watch route changes.
	$rootScope.$on('$routeChangeStart', function (event, next, current) {

		if (!AuthenticationModel.isSignedIn()) {
			// If not Signed In yet, but it's trying to access a private page, then redirect it to the `Sign In` page.
			if (next.redirectTo === undefined && next.requireAuthentication === undefined) {
				$location.path('/signin');
			}
		} else {
			// If already Signed In, but it's trying to access a public page, then redirect it to the `defaultRoute`.
			if (next.requireAuthentication === false) {
				$location.path('/player/' + AuthenticationModel.player.id);
			}
		}
	});

});