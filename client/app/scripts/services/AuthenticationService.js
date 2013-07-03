'use strict';

app.factory('AuthenticationService', 
	function ($http, $location, $cookieStore, AuthenticationModel, ConfigService) {

	this.signIn = function (username, password) {
		$cookieStore.remove('isSignedIn');
		
		return $http({
			method: 'POST',
			url: ConfigService.API_URL + '/login',
			withCredentials: true,
			data: {
				'username': username,
				'password': password
			}
		}).success(function (data, status, headers, config) {
			AuthenticationModel.isSignedIn = true;
			$cookieStore.put('isSignedIn', true);
			$location.path('/match');
		}).error(function (data, status, headers, config) {
			AuthenticationModel.err = data.err;
		});
	};

	this.signOut = function () {

		var clearUsername = function () {
			$cookieStore.remove('isSignedIn');
			$location.path('/');
		};

		return $http.get(ConfigService.API_URL + '/logout', { withCredentials: true })
			.success(clearUsername)
			.error(clearUsername);
	};

	this.signUp = function (username, email, password) {
	};

	return this;

});