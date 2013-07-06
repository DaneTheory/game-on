'use strict';

app.factory('AuthenticationModel', function ($http, $location, $cookieStore, API_URL, DEFAULT_ROUTE) {

	this.player = $cookieStore.get('player');
	this.errorStatus = null;

	this.isSignedIn = function() {
		return !!this.player;
	};

	this.setPlayer = function(player) {
		this.errorStatus = null;
		this.player = player;
		$cookieStore.put('player', player);
	};

	this.removePlayer = function() {
		this.player = null;
		$cookieStore.remove('player');
	};

	this.signIn = function (username, password) {
		return $http.post(API_URL + '/auth/signin', {
			username: username,
			password: password
		}).success(angular.bind(this, function(data) {
			this.setPlayer(data.player);
			$location.path(DEFAULT_ROUTE);
		})).error(angular.bind(this, function (data, status) {
			this.removePlayer();
			this.errorStatus = status;
		}));
	};

	this.signOut = function () {
		this.removePlayer();
		$location.path('/');

		return $http.get(API_URL + '/auth/signout');
	};

	this.signUp = function (username, password, name, email) {
		return $http.post(API_URL + '/auth/signup', {
			username: username,
			password: password,
			name: name,
			email: email
		}).success(angular.bind(this, function(data) {
			this.setPlayer(data.player);
			$location.path(DEFAULT_ROUTE);
		})).error(angular.bind(this, function (data, status) {
			this.removePlayer();
			this.errorStatus = status;
		}));
	};

	return this;

});