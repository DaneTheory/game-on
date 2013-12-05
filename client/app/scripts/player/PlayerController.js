//
//
//

'use strict';

app.controller('PlayerCtrl',
	function ($scope, $routeParams, PlayerModel, FeedModel, VibrationHelper,
		PushNotificationHelper, GeolocationHelper, CacheHelper) {

	$scope.PlayerModel = PlayerModel;
	$scope.FeedModel = FeedModel;
	
	$scope.playerId = $routeParams.playerId;
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