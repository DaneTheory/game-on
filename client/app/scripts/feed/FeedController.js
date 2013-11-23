//
//
//

'use strict';

app.controller('FeedCtrl', function ($scope, FeedModel, PushNotificationHelper, CacheHelper) {

	PushNotificationHelper.on('feed', function () {
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