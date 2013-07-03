'use strict';

app.controller('AuthenticationCtrl', function ($scope, AuthenticationService, AuthenticationModel) {

	$scope.username = 'johnny';
	$scope.password = 'johnny';

	$scope.AuthenticationModel = AuthenticationModel;

	$scope.signIn = function(username, password){
		AuthenticationService.signIn(username, password);
	};

});