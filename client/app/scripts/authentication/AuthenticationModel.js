'use strict';

app.factory('AuthenticationModel', function ($http, $location, $cookieStore, ApiUrl, DefaultRoute) {

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
		return $http.post(ApiUrl + '/auth/signin', {
			username: username,
			password: password
		}).success(angular.bind(this, function(data) {
			this.setPlayer(data.player);
			$location.path(DefaultRoute);
		})).error(angular.bind(this, function (data, status) {
			this.removePlayer();
			this.errorStatus = status;
		}));
	};

	this.signOut = function () {
		this.removePlayer();
		$location.path('/');

		return $http.get(ApiUrl + '/auth/signout');
	};

	this.signUp = function (username, password, name, email) {
		return $http.post(ApiUrl + '/auth/signup', {
			username: username,
			password: password,
			name: name,
			email: email
		}).success(angular.bind(this, function(data) {
			this.setPlayer(data.player);
			$location.path(DefaultRoute);
		})).error(angular.bind(this, function (data, status) {
			this.removePlayer();
			this.errorStatus = status;
		}));
	};

	return this;

});