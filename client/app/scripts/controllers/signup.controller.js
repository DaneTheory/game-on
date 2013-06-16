'use strict';

app.controller('SignupController', function ($scope, AuthService) {

	$scope.username;
	$scope.email;
	$scope.password;

	$scope.err = '';

	$scope.AuthService = AuthService;

	$scope.signup = function(username, email, password){
		AuthService.signup(username, email, password);
	};

});