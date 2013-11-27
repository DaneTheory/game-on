//
//
//

'use strict';

app.controller('PlayerCtrl', function ($scope, $routeParams, PlayerModel, FeedModel, PlayerHelper, VibrationHelper, PushNotificationHelper, GeolocationHelper, CacheHelper) {

	$scope.PlayerModel = PlayerModel;
	$scope.PlayerHelper = PlayerHelper;
	$scope.FeedModel = FeedModel;
	
	$scope.playerId = $routeParams.playerId;
	$scope.tab = 0;

	// TODO: Review this code.
	$scope.getById = function () {
		PlayerModel.getById($scope.playerId);
	};

	// TODO: Review this code.
	$scope.isMe = function () {
		return PlayerHelper.isMe(PlayerModel.player.id);
	};

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

	// Pre-load Geolocation.
	GeolocationHelper.getGeoLocation();
});