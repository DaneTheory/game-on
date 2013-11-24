//
//
//

'use strict';

app.controller('FeedCtrl', function ($scope, FeedModel, PushNotificationHelper, CacheHelper) {

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

	$scope.markAsRead = function (feed) {
		FeedModel.markAsRead(feed);
	};

	$scope.markAllAsRead = function () {
		FeedModel.markAllAsRead();
	};

});