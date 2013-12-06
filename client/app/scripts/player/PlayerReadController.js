//
//
//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('PlayerReadCtrl',
	function ($scope, $routeParams, PlayerService, FeedService, VibrationHelper,
		PushNotificationHelper, GeolocationHelper, CacheHelper) {

	$scope.PlayerService = PlayerService;
	$scope.FeedService = FeedService;
	
	$scope.playerId = $routeParams.playerId;
	$scope.tab = 0;

	$scope.loadFeeds = function () {
		CacheHelper.remove('feed');

		FeedService.getFeeds().then(angular.bind($scope, function (feeds) {
			FeedService.feeds = feeds;
		}));
	};

	$scope.loadFeeds();

	PushNotificationHelper.on('feed', function () {
		VibrationHelper.vibrate();
		$scope.loadFeeds();
	});

	PlayerService.getById($scope.playerId).then(function (data) {
		PlayerService.player = data;
	});

	// Pre-load Geolocation.
	GeolocationHelper.getGeoLocation();
});