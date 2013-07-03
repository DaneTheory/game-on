app.controller('SignupController', function ($scope, AuthService) {

	'use strict';

	$scope.username = null;
	$scope.email = null;
	$scope.password = null;

	$scope.err = '';

	$scope.AuthService = AuthService;

	$scope.signup = function(username, email, password){
		AuthService.signup(username, email, password);
	};

});