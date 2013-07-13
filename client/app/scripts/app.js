'use strict';

var app = angular.module('football94', ['ngCookies']);

app.constant('API_URL', '//localhost:3000/api/1');
app.constant('DEFAULT_ROUTE', '/feed');

app.config(function ($routeProvider, $httpProvider, $locationProvider) {

	$httpProvider.interceptors.push('AuthenticationInterceptor');
	$httpProvider.defaults.withCredentials = true;

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
		.when('/:playerId', {
			templateUrl: 'views/player/PlayerDetailView.html',
			controller: 'PlayerCtrl'
		})
		.otherwise({
			redirectTo: '/',
			requireAuthentication: false
		});

});

app.run(function ($rootScope, $location, AuthenticationModel, DEFAULT_ROUTE) {

	// Register listener to watch route changes.
	$rootScope.$on('$routeChangeStart', function (event, next, current) {
		if (!AuthenticationModel.isSignedIn()) {
			if (next.redirectTo === undefined && next.requireAuthentication === undefined) {
				$location.path('/signin');
			}
		} else {
			if (next.requireAuthentication === false) {
				$location.path(DEFAULT_ROUTE);
			}
		}
	});

});