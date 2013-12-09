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

// devcode: development
app.constant('ServerUrl', '//localhost:3000');
app.constant('ApiUrl', '//localhost:3000/api/1');
// endcode

// devcode: production
app.constant('ServerUrl', '/');
app.constant('ApiUrl', '/api/1');
// endcode

app.config(function ($routeProvider, $httpProvider, $locationProvider) {

	// Add `AuthenticationInterceptor` to check if the `Player` is still Signed In.
	$httpProvider.interceptors.push('AuthenticationInterceptor');

	// Add `withCredentials` header to requests. (CORS requirement)
	$httpProvider.defaults.withCredentials = true;

	// Enable HTML5 mode. (Remove the `#` from Url)
	$locationProvider.html5Mode(true);

	// Routing.
	$routeProvider
		.when('/', {
			templateUrl: 'views/main/MainView.html',
			requireAuthentication: false
		})
		.when('/player/update', {
			templateUrl: 'views/player/PlayerUpdateView.html',
			controller: 'PlayerUpdateCtrl'
		})
		.when('/player/:playerId', {
			templateUrl: 'views/player/PlayerView.html',
			controller: 'PlayerReadCtrl'
		})
		.when('/venue/create', {
			templateUrl: 'views/venue/VenueCreateView.html',
			controller: 'VenueCreateCtrl'
		})
		.when('/game/create', {
			templateUrl: 'views/game/GameCreateView.html',
			controller: 'GameCreateCtrl'
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
		.when('/auth/social', {
			templateUrl: 'views/authentication/SocialView.html',
			controller: 'AuthenticationCtrl',
			requireAuthentication: false
		})
		.otherwise({
			redirectTo: '/',
			requireAuthentication: false
		});

});

app.run(function ($rootScope, $location, AuthenticationService) {

	// Register listener to watch route changes.
	$rootScope.$on('$routeChangeStart', function (event, next, current) {

		if (!AuthenticationService.isSignedIn()) {
			// If not Signed In yet, but it's trying to access a private page, then redirect it to the `Sign In` page.
			if (next.redirectTo === undefined && next.requireAuthentication === undefined) {
				$location.path('/signin');
			}
		} else {
			// If already Signed In, but it's trying to access a public page, then redirect it to the `defaultRoute`.
			if (next.requireAuthentication === false) {
				$location.path('/player/' + AuthenticationService.player.id);
			}
		}
	});

});