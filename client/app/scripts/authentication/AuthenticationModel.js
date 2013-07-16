'use strict';

app.factory('AuthenticationModel', function ($http, $window, $location, $cookieStore, ApiUrl, DefaultRoute) {

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

	this.facebookRequestToken = function () {
		return $http.get(ApiUrl + '/auth/signup/facebook')
			.success(function(data) {
				$window.location.href = data + '&display=touch';
			})
			.error(function(data) {
				console.log('error', data);
			});
	};

	this.facebookSignUp = function() {
		return $http.get(ApiUrl + '/auth/signup/facebook/callback', {
				params: $location.search()
			}).success(angular.bind(this, function(data) {
				this.setPlayer(data.player);
				$location.search('code', null); // Remove token.
				$location.hash(null); // Remove Facebook's `#_=_` buggy hash.
				$location.path(DefaultRoute);
			})).error(function() {
				$location.search('code', null);
				$location.path('/signup')
			});
	};

	return this;

});