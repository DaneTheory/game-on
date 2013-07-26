'use strict';

var app = angular.module('football94', ['ngCookies']);

var serverUrl = '//localhost:3000',
	apiVersion = 1;

app.constant('ServerUrl', serverUrl);
app.constant('ApiUrl', serverUrl + '/api/' + apiVersion);
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
		.when('/match/:matchId', {
			templateUrl: 'views/match/MatchDetailView.html',
			controller: 'MatchCtrl'
		})
		.when('/signin', {
			templateUrl: 'views/SignInView.html',
			controller: 'AuthenticationCtrl',
			requireAuthentication: false
		})
		.when('/signup', {
			templateUrl: 'views/SignUpView.html',
			controller: 'AuthenticationCtrl',
			requireAuthentication: false
		})
		.when('/facebook', {
			templateUrl: 'views/AuthFacebookView.html',
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