//
//
//

'use strict';

app.controller('PlayerCtrl', function ($scope, $routeParams, PlayerModel, FeedModel, PlayerHelper, PushNotificationHelper, CacheHelper) {

	$scope.PlayerModel = PlayerModel;
	$scope.PlayerHelper = PlayerHelper;
	$scope.FeedModel = FeedModel;
	
	$scope.playerId = $routeParams.playerId;
	$scope.tab = 0;

	// TODO: Review this.
	$scope.getById = function () {
		PlayerModel.getById($scope.playerId);
	};

	// TODO: Review this.
	$scope.isMe = function () {
		return PlayerHelper.isMe(PlayerModel.player.id);
	};

	PushNotificationHelper.on('feed', function () {
		if (window.navigator.vibrate) {
			window.navigator.vibrate(200);
		}

		$scope.loadFeeds();
	});

	$scope.loadFeeds = function () {
		CacheHelper.remove('feed');

		FeedModel.getFeeds().then(angular.bind($scope, function (feeds) {
			FeedModel.feeds = feeds;
		}));
	};

	$scope.loadFeeds();


});