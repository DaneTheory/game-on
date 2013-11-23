//
//
//

'use strict';

app.controller('FeedCtrl', function ($scope, FeedModel) {

	$scope.feeds;

	FeedModel.getList().then(angular.bind($scope, function (feeds) {
		this.feeds = feeds;
	}));

});