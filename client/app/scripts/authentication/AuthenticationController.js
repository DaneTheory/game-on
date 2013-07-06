'use strict';

app.controller('AuthenticationCtrl', function ($scope, AuthenticationModel) {

	$scope.username = 'johnny';
	$scope.password = 'johnny';

	$scope.AuthenticationModel = AuthenticationModel;

	$scope.signIn = function(username, password){
		AuthenticationModel.signIn(username, password);
	};

	$scope.signOut = function(){
		AuthenticationModel.signOut();
	};

	$scope.signUp = function(username, email, password){
		/* TODO */
		AuthenticationModel.signUp(username, email, password);
	};

});