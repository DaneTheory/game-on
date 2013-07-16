'use strict';

app.controller('MenuCtrl', function ($scope, PushNotificationHelper, AuthenticationModel) {

	$scope.AuthenticationModel = AuthenticationModel;

	$scope.search = null;
	$scope.isSearching = false;
	$scope.notifications = 0;

	// PushNotificationHelper.on('feed', function (data) {
	// 	console.log(data);
	// 	$scope.notifications++;
	// });

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