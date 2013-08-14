//
// # Football (Inspired by jogabo.com)
// `Football` connects you with the players in your city and
// allows you to find, organize and share matches effortlessly.
// 
// 2013 Pablo De Nadai
//

'use strict';

var app = angular.module('football', ['ngCookies']);

// TODO: Add this to an environment kind of file.
var serverUrl = '//localhost:3000';
app.constant('ServerUrl', serverUrl);				// Back-end Url
app.constant('ApiUrl', serverUrl + '/api/1');		// Back-end RESTful API Url.
app.constant('DefaultRoute', '/feed');				// Default __private__ page.

app.config(function ($routeProvider, $httpProvider, $locationProvider) {

	// Set `html5Model` on. (uh oh!)
	$locationProvider.html5Mode(true);

	// Add `AuthenticationInterceptor` to check if the `Player` is still Signed In.
	$httpProvider.interceptors.push('AuthenticationInterceptor');

	// Add `withCredentials` header to requests. (CORS requirement)
	$httpProvider.defaults.withCredentials = true;

	// Google Maps Style
	google.maps.visualRefresh = true;

	//
	// AngularJS Routing.
	// It's getting pretty fat.
	//
	$routeProvider
		.when('/', {
			templateUrl: 'views/MainView.html',
			requireAuthentication: false
		})
		.when('/feed', {
			templateUrl: 'views/FeedView.html'
		})
		.when('/player', {
			templateUrl: 'views/player/PlayerCollectionView.html',
			controller: 'PlayerCtrl'
		})
		.when('/venue', {
			templateUrl: 'views/venue/VenueCollectionView.html',
			controller: 'VenueCtrl'
		})
		.when('/venue/:venueId', {
			templateUrl: 'views/venue/VenueDetailView.html',
			controller: 'VenueCtrl'
		})
		.when('/match', {
			templateUrl: 'views/match/MatchCollectionView.html',
			controller: 'MatchCtrl'
		})
		.when('/match/new', {
			templateUrl: '../views/match/MatchNewView.html',
			controller: 'MatchCtrl'
		})
		.when('/match/:matchId', {
			templateUrl: 'views/match/MatchDetailView.html',
			controller: 'MatchCtrl'
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
		.when('/:playerId', {
			templateUrl: 'views/player/PlayerDetailView.html',
			controller: 'PlayerCtrl'
		})
		.otherwise({
			redirectTo: '/',
			requireAuthentication: false
		});

});

app.run(function ($rootScope, $location, DefaultRoute, AuthenticationModel) {

	// Register listener to watch route changes.
	$rootScope.$on('$routeChangeStart', function (event, next, current) {

		if (!AuthenticationModel.isSignedIn()) {
			// If not Signed In yet, but it's trying to access a private page, then redirect it to the `Sign In` page.
			if (next.redirectTo === undefined && next.requireAuthentication === undefined) {
				$location.path('/signin');
			}
		} else {
			// If already Signed In, but it's trying to access a public page, then redirect it to the `DefaultRoute`.
			if (next.requireAuthentication === false) {
				$location.path(DefaultRoute);
			}
		}
	});

});