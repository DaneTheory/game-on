'use strict';

app.controller('MenuCtrl', function ($scope, AuthenticationModel) {

	$scope.AuthenticationModel = AuthenticationModel;

	$scope.search = null;
	$scope.isSearching = false;

	$scope.signOut = function () {
		AuthenticationModel.signOut();
	};

	$scope.stopSearching = function () {
		$scope.search = '';
		$scope.isSearching = false;
	};

	$scope.startSearching = function () {
		$scope.isSearching = true;
	};

});