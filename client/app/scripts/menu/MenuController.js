'use strict';

app.controller('MenuCtrl', function ($scope, AuthenticationService, AuthenticationModel) {

	$scope.AuthenticationService = AuthenticationService;
	$scope.AuthenticationModel = AuthenticationModel;

	$scope.signOut = function(){
		AuthenticationService.signOut();
	};

});