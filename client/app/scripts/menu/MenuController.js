//
//
//

'use strict';

app.controller('MenuCtrl', function ($scope, $location, $http, ApiUrl, PushNotificationHelper, AuthenticationModel) {

	$scope.AuthenticationModel = AuthenticationModel;

	$scope.notifications = 0;

	PushNotificationHelper.on('MatchJoined', function (data) {
		console.log('Someone joined your game:', data);
		$scope.notifications++;
	});

	$scope.signOut = function () {
		AuthenticationModel.removePlayer();
		$location.path('/');
		return $http.get(ApiUrl + '/auth/signout');
	};

});