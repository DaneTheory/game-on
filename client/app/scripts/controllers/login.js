'use strict';

app.controller('LoginController', function ($scope, AuthService) {

	$scope.username = 'johnny';
	$scope.password = 'johnny';
	$scope.err = '';

	$scope.AuthService = AuthService;

	$scope.login = function(username, password){
		AuthService.login(username, password);
	};

});