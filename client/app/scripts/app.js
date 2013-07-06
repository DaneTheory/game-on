'use strict';

var app = angular.module('football94', ['ngCookies', '$strap.directives']);

app.constant('API_URL', '//localhost:3000/api/1');
app.constant('DEFAULT_ROUTE', '/match');

app.config(function ($routeProvider, $httpProvider, $locationProvider) {

	$httpProvider.interceptors.push('AuthenticationInterceptor');
	$httpProvider.defaults.withCredentials = true;

	$routeProvider
		.when('/', {
			templateUrl: 'views/MainView.html',
			requireAuthentication: false
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
		.when('/player', {
			templateUrl: 'views/PlayerCollectionView.html',
			controller: 'PlayerCollectionCtrl'
		})
		.when('/player/:playerId', {
			templateUrl: 'views/PlayerView.html',
			controller: 'PlayerCtrl'
		})
		.when('/venue', {
			templateUrl: 'views/VenueCollectionView.html',
			controller: 'VenueCollectionCtrl'
		})
		.when('/venue/:venueId', {
			templateUrl: 'views/VenueView.html',
			controller: 'VenueCtrl'
		})
		.when('/match', {
			templateUrl: 'views/MatchCollectionView.html',
			controller: 'MatchCollectionCtrl'
		})
		.when('/match/:matchId', {
			templateUrl: 'views/MatchView.html',
			controller: 'MatchCtrl'
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
		}
	});

});