app.controller('MenuController', function ($scope, AuthenticationService) {

	'use strict';

	$scope.AuthenticationService = AuthenticationService;

	$scope.signOut = function(){
		AuthenticationService.signOut();
	};

});