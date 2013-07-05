'use strict';

app.factory('AuthenticationService', function ($http, $location, AuthenticationModel, API_URL) {

	this.signIn = function (username, password) {
		AuthenticationModel.setIsSignedIn(false);

		return $http.post(API_URL + '/auth/signin', {
			username: username,
			password: password
		}).success(function () {
			AuthenticationModel.setIsSignedIn(true);
			$location.path('/match');
		}).error(function (data, status) {
			AuthenticationModel.errorStatus = status;
		});
	};

	this.signOut = function () {
		AuthenticationModel.setIsSignedIn(false);
		$location.path('/');

		return $http.get(API_URL + '/auth/signout');
	};

	this.signUp = function (username, email, password) {

	};

	return this;

});