//
// # Feed Controller
//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('FeedCtrl', function ($scope, FeedService) {

	//
	// ### function markAsRead (feed)
	// #### @feed {object} Feed instance
	// Mark a given feed as read.
	//
	$scope.markAsRead = function (feed) {
		FeedService.markAsRead(feed);
	};

	//
	// ### function markAllAsRead ()
	// Mark all feed items - for the current signed in user - as read.
	//
	$scope.markAllAsRead = function () {
		FeedService.markAllAsRead();
	};

});