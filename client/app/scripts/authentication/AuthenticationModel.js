'use strict';

app.factory('AuthenticationModel', function ($http, $location, $cookieStore, API_URL, DEFAULT_ROUTE) {

	this.isSignedIn = $cookieStore.get('isSignedIn');
	this.errorStatus = null;

	this.setIsSignedIn = function(value) {
		this.isSignedIn = value;

		if (value) {
			this.errorStatus = null;
			$cookieStore.put('isSignedIn', true);
		} else {
			$cookieStore.remove('isSignedIn');
		}
	};

	this.signIn = function (username, password) {
		this.setIsSignedIn(false);

		return $http.post(API_URL + '/auth/signin', {
			username: username,
			password: password
		}).success(angular.bind(this, function() {
			this.setIsSignedIn(true);
			$location.path(DEFAULT_ROUTE);
		})).error(angular.bind(this, function (data, status) {
			this.errorStatus = status;
		}));
	};

	this.signOut = function () {
		this.setIsSignedIn(false);
		$location.path('/');

		return $http.get(API_URL + '/auth/signout');
	};

	this.signUp = function (username, email, password) {

	};

	return this;

});