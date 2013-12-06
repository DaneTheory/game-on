//
// # AuthenticationController.js  
// App authentication business logic.
// It handles Local and Social (Facebook) strategies.
//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('AuthenticationCtrl', function ($scope, $http, $location, $window, AuthenticationService, ApiUrl) {

	// Credentials
	$scope.password = null;
	$scope.name = null;
	$scope.email = null;

	$scope.AuthenticationService = AuthenticationService;

	//
	// ### function signIn (email, password)
	// #### @email {email} Email
	// #### @password {password} Password
	// Sign In: Local strategy logic.
	// 
	$scope.signIn = function (email, password) {
		return $http.post(ApiUrl + '/auth/signin', {
			email: email,
			password: password
		}).success(function (data) {
			// Add signed in Player to the service and cookies.
			AuthenticationService.setPlayer(data.player);
			// Redicted route to default route.
			$location.path(AuthenticationService.getPath());
		}).error(function (data) {
			// Remove signed in Player from the service and clean the cookies.
			AuthenticationService.removePlayer();
			// Display error message.
			AuthenticationService.errorMessage = data;
		});
	};

	//
	// ### function signUp (email, password, name)
	// #### @email {email} Email
	// #### @password {password} Password
	// #### @name {name} Name
	// Sign Up: Local strategy logic.
	// 
	$scope.signUp = function (email, password, name) {
		return $http.post(ApiUrl + '/auth/signup', {
			email: email,
			password: password,
			name: name,
		}).success(function(data) {
			AuthenticationService.setPlayer(data.player);
			$location.path(AuthenticationService.getPath());
		}).error(function (data) {
			AuthenticationService.removePlayer();
			AuthenticationService.errorMessage = data;
		});
	};

	//
	// ### function authSocialRequestToken (action, provider)
	// #### @action {string} Accepts `signin` or `signup`
	// #### @provider {string} Accepts `facebook` or `twitter`
	// 1st step when authenticating with a social account (request token)
	//
	$scope.authSocialRequestToken = function (action, provider) {
		return $http.get(ApiUrl + '/auth/' + action + '/' + provider)
			.success(function(url) {
				$window.location.href = url;
			});
	};

	//
	// ### function authSocialValidateToken (action, provider)
	// 2nd step when authenticating with a social account (validate token)
	// Requires the following Url search properties:
	// - @action {string} Accepts `signin` or `signup`
	// - @provider {string} Accepts `facebook` or `twitter`
	//
	$scope.authSocialValidateToken = function () {
		var search = $location.search(),
			action = search.action,
			provider = search.provider;

		return $http.get(ApiUrl + '/auth/' + action + '/' + provider + '/callback', {
				params: $location.search()
			})
			.success(function(data) {
				$scope.removeUrlParams();
				AuthenticationService.setPlayer(data.player);
				$location.path(AuthenticationService.getPath()); // Redirect to the private page.
			})
			.error(function(data) {
				$scope.removeUrlParams();
				AuthenticationService.errorMessage = data;
				$location.path('/auth/signin'); // Redirect to the sign in page.
			});		
	};

	$scope.removeUrlParams = function () {
		$location.search({}); // Remove params from url.
		$location.hash(null); // Remove Facebook `#_=_` buggy hash.
	};

});