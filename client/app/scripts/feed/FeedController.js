//
//
//

'use strict';

app.controller('FeedCtrl', function ($scope, FeedModel) {

	$scope.markAsRead = function (feed) {
		FeedModel.markAsRead(feed);
	};

	$scope.markAllAsRead = function () {
		FeedModel.markAllAsRead();
	};

});