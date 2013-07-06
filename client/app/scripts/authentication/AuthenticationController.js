'use strict';

app.controller('AuthenticationCtrl', function ($scope, AuthenticationModel) {

	// Placeholder data.
	$scope.username = 'johnny';
	$scope.password = 'johnny';
	$scope.name = 'John Smith';
	$scope.email = 'johnny@gmail.com';

	$scope.AuthenticationModel = AuthenticationModel;

	$scope.signIn = function(username, password){
		AuthenticationModel.signIn(username, password);
	};

	$scope.signOut = function(){
		AuthenticationModel.signOut();
	};

	$scope.signUp = function(username, password, name, email){
		AuthenticationModel.signUp(username, password, name, email);
	};

});