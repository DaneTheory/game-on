//
// # Authentication Controller
// Authentication business logic.
// It handles Local and Social (Facebook and Twitter) strategies.
//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('AuthenticationCtrl', function ($scope, $location, $window, AuthenticationService) {

	// Credentials
	$scope.password = null;
	$scope.name = null;
	$scope.email = null;

	$scope.AuthenticationService = AuthenticationService;

	//
	// ### function signIn (email, password)
	// #### @email {string} Email
	// #### @password {string} Password
	// Sign In: Local strategy logic.
	// 
	$scope.signIn = function (email, password) {
		AuthenticationService.signIn(email, password)
			.success($scope.signSuccess)
			.error($scope.signError);
	};

	//
	// ### function signUp (email, password, name)
	// #### @email {string} Email
	// #### @password {string} Password
	// #### @name {string} Name
	// Sign Up: Local strategy logic.
	// 
	$scope.signUp = function (email, password, name) {
		AuthenticationService.signIn(email, password, name)
			.success($scope.signSuccess)
			.error($scope.signError);
	};	

	//
	// ### function signSucess (data)
	// #### @data {object} Player's information.
	// Handler for `sign in` and `sign up` success callback.
	// Stores the player information in the `AuthenticationService`
	// And redirects the app to the profile page.
	//
	$scope.signSuccess = function (data) {
		AuthenticationService.setPlayer(data.player); // Add signed in Player to the service and cookies.
		$location.path(AuthenticationService.getPath()); // Redicted route to default route.
	};

	//
	// ### function signError (data)
	// #### @data {object} Error information.
	// Handler for `sign in` and `sign up` error callback.
	// Removes the player information from the `AuthenticationService`
	// And displays the authentication error message.
	//
	$scope.signError = function (data) {
		AuthenticationService.removePlayer(); // Remove signed in Player from the service and clean the cookies.
		AuthenticationService.errorMessage = data; // Display error message.
	};



	//
	// ### function requestToken (action, provider)
	// #### @action {string} Accepts `signin` or `signup`
	// #### @provider {string} Accepts `facebook` or `twitter`
	// 1st step when authenticating with a social account (request token)
	//
	$scope.requestToken = function (action, provider) {
		AuthenticationService.requestToken(action, provider)
			.success(function(url) {
				$window.location.href = url;
			});
	};

	//
	// ### function validateToken ()
	// 2nd step when authenticating with a social account (validate token)
	// Requires the following Url search properties:
	// - @action {string} Accepts `signin` or `signup`
	// - @provider {string} Accepts `facebook` or `twitter`
	//
	$scope.validateToken = function () {
		var search = $location.search();
		
		AuthenticationService.validateToken(search)
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

	//
	// ### function removeUrlParams ()
	// Removes the tokens from the Url search params.
	// And cleans the hash params when authenticating with Facebook.
	//
	$scope.removeUrlParams = function () {
		$location.search({}); // Remove params from url.
		$location.hash(null); // Remove Facebook `#_=_` buggy hash.
	};

});