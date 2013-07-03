app.controller('SignupController', function ($scope, AuthenticationService) {

	'use strict';

	$scope.username = null;
	$scope.email = null;
	$scope.password = null;

	$scope.err = '';

	$scope.AuthService = AuthService;

	$scope.signUp = function(username, email, password){
		AuthenticationService.signUp(username, email, password);
	};

});