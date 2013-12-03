//
// # AuthenticationController.js  
// App authentication business logic.
// It handles Local and Social (Facebook) strategies.
//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('AuthenticationCtrl', function ($scope, $http, $location, $window, AuthenticationModel, ApiUrl) {

	// Credentials
	// TODO: Move this to Model?
	$scope.password = null;
	$scope.name = null;
	$scope.email = null;

	$scope.AuthenticationModel = AuthenticationModel;

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
			// Add signed in Player to the model and cookies.
			AuthenticationModel.setPlayer(data.player);
			// Redicted route to default route.
			$location.path(AuthenticationModel.getPath());
		}).error(function (data) {
			// Remove signed in Player from the model and clean the cookies.
			AuthenticationModel.removePlayer();
			// Display error message.
			AuthenticationModel.errorMessage = data;
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
			AuthenticationModel.setPlayer(data.player);
			$location.path(AuthenticationModel.getPath());
		}).error(function (data) {
			AuthenticationModel.removePlayer();
			AuthenticationModel.errorMessage = data;
		});
	};

	$scope.signFacebook = function () {
		var search = $location.search(),
			action = search.action;

		if (action === 'signin') {
			$scope.signInFacebook();
		} else if (action === 'signup') {
			$scope.signUpFacebook();
		}
	};

	$scope.signUpFacebookRequestToken = function () {
		return $http.get(ApiUrl + '/auth/signup/facebook')
			.success(function(url) {
				$window.location.href = url;
			});
	};

	$scope.signUpFacebook = function () {
		return $http.get(ApiUrl + '/auth/signup/facebook/callback', {
				params: $location.search()
			}).success(function(data) {
				$scope.removeUrlParams();
				AuthenticationModel.setPlayer(data.player);
				$location.path(AuthenticationModel.getPath()); // Redirect to the private page.
			}).error(function(data) {
				$scope.removeUrlParams();
				AuthenticationModel.errorMessage = data;
				$location.path('/auth/signup'); // Redirect to sign up page.
			});
	};

	$scope.signInFacebookRequestToken = function () {
		return $http.get(ApiUrl + '/auth/signin/facebook')
			.success(function(url) {
				$window.location.href = url;
			});
	};

	$scope.signInFacebook = function () {
		return $http.get(ApiUrl + '/auth/signin/facebook/callback', {
				params: $location.search()
			}).success(function(data) {
				$scope.removeUrlParams();
				AuthenticationModel.setPlayer(data.player);
				$location.path(AuthenticationModel.getPath()); // Redirect to the private page.
			}).error(function(data) {
				$scope.removeUrlParams();
				AuthenticationModel.errorMessage = data;
				$location.path('/auth/signin'); // Redirect to the sign in page.
			});
	};

	$scope.removeUrlParams = function () {
		$location.search(null); // Remove params from url.
		$location.hash(null); // Remove Facebook `#_=_` buggy hash.
	};

	$scope.init = function () {
		// Development placeholders.
		$scope.email = 'pablodenadai@gmail.com';
		$scope.password = '123';
		$scope.name = 'Pablo De Nadai';
		AuthenticationModel.errorStatus = null;
	};

	$scope.init();

});