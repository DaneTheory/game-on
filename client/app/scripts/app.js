'use strict';

var app = angular.module('football94', ['ngCookies']);

var serverUrl = '//localhost:3000';

app.constant('ServerUrl', serverUrl);
app.constant('ApiUrl', serverUrl + '/api/1');
app.constant('DefaultRoute', '/feed');

app.config(function ($routeProvider, $httpProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$httpProvider.interceptors.push('AuthenticationInterceptor');
	$httpProvider.defaults.withCredentials = true;

	// Google Maps Style
	google.maps.visualRefresh = true;

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
			if (next.redirectTo === undefined && next.requireAuthentication === undefined) {
				$location.path('/signin');
			}
		} else {
			if (next.requireAuthentication === false) {
				$location.path(DefaultRoute);
			}
		}
	});

});