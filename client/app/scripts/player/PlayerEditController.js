//
//
//

'use strict';

app.controller('PlayerEditCtrl', function ($scope, $routeParams, PlayerModel, FeedModel, PlayerHelper, VibrationHelper, PushNotificationHelper, GeolocationHelper, CacheHelper) {

	$scope.PlayerModel = PlayerModel;
	$scope.PlayerHelper = PlayerHelper;
	$scope.FeedModel = FeedModel;
	
	$scope.playerId = '529e847b75c7558c3d000001';
	$scope.tab = 0;

	$scope.loadFeeds = function () {
		CacheHelper.remove('feed');

		FeedModel.getFeeds().then(angular.bind($scope, function (feeds) {
			FeedModel.feeds = feeds;
		}));
	};

	$scope.loadFeeds();

	PushNotificationHelper.on('feed', function () {
		VibrationHelper.vibrate();
		$scope.loadFeeds();
	});

	PlayerModel.getById($scope.playerId).then(function (data) {
		PlayerModel.player = data;
	});

	// Pre-load Geolocation.
	GeolocationHelper.getGeoLocation();
});