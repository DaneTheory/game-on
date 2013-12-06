//
//
//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('FeedCtrl', function ($scope, FeedService) {

	$scope.markAsRead = function (feed) {
		FeedService.markAsRead(feed);
	};

	$scope.markAllAsRead = function () {
		FeedService.markAllAsRead();
	};

});