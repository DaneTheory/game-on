app.controller('MenuController', function ($scope, AuthService) {

	'use strict';

	$scope.AuthService = AuthService;

	$scope.logout = function(){
		AuthService.logout();
	};

});