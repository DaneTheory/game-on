//
// # AuthenticationController.js  
// App authentication business logic.
// It handles Local and Social (Facebook) strategies.
//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('AuthenticationCtrl',
	function ($scope, $http, $location, $window, AuthenticationModel, DefaultRoute, ApiUrl) {

	// Credentials
	$scope.username = null;
	$scope.password = null;
	$scope.name = null;
	$scope.email = null;

	$scope.AuthenticationModel = AuthenticationModel;

	//
	// ### function signIn (username, password)
	// #### @username {username} Username
	// #### @password {password} Password
	// Sign In: Local strategy logic.
	// 
	$scope.signIn = function (username, password) {
		return $http.post(ApiUrl + '/auth/signin', {
			username: username,
			password: password
		}).success(function (data) {
			// Add signed in Player to the model and cookies.
			AuthenticationModel.setPlayer(data.player);
			// Redicted route to default route.
			$location.path(DefaultRoute);
		}).error(function (data) {
			// Remove signed in Player from the model and clean the cookies.
			AuthenticationModel.removePlayer();
			// Display error message.
			AuthenticationModel.errorMessage = data;
		});
	};

	//
	// ### function signUp (username, password, name, email)
	// #### @username {username} Username
	// #### @password {password} Password
	// #### @name {name} Name
	// #### @email {email} Email
	// Sign Up: Local strategy logic.
	// 
	$scope.signUp = function (username, password, name, email) {
		return $http.post(ApiUrl + '/auth/signup', {
			username: username,
			password: password,
			name: name,
			email: email
		}).success(function(data) {
			AuthenticationModel.setPlayer(data.player);
			$location.path(DefaultRoute);
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
				$location.path(DefaultRoute); // Redirect to the private page.
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
				$location.path(DefaultRoute); // Redirect to the private page.
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

	$scope.clear = function () {
		// Development placeholders.
		$scope.username = 'pablodenadai';
		$scope.password = '123';
		$scope.name = 'Pablo De Nadai';
		$scope.email = 'pablodenadai@gmail.com';
		AuthenticationModel.errorStatus = null;
	};

});