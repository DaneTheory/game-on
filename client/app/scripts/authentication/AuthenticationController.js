'use strict';

app.controller('AuthenticationCtrl', function ($scope, AuthenticationModel) {

	$scope.username = null;
	$scope.password = null;
	$scope.name = null;
	$scope.email = null;

	$scope.AuthenticationModel = AuthenticationModel;

	$scope.signIn = function (username, password) {
		AuthenticationModel.signIn(username, password);
	};

	$scope.signOut = function () {
		AuthenticationModel.signOut();
	};

	$scope.signUp = function (username, password, name, email) {
		AuthenticationModel.signUp(username, password, name, email);
	};

	$scope.clear = function () {
		// Development placeholders.
		$scope.username = 'pablodenadai';
		$scope.password = '123';
		$scope.name = 'Pablo De Nadai';
		$scope.email = 'pablodenadai@gmail.com';
		AuthenticationModel.errorStatus = null;
	};

});