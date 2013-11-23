//
//
//

'use strict';

app.controller('PlayerCtrl', function ($scope, $routeParams, PlayerModel, PlayerHelper, FeedModel) {

	$scope.PlayerModel = PlayerModel;
	$scope.PlayerHelper = PlayerHelper;
	
	$scope.playerId = $routeParams.playerId;
	$scope.tab = 1;
	$scope.notifications = 0;

	FeedModel.getList().then(angular.bind($scope, function (data) {
		this.notifications = data ? data.length : 0;
	}))

	$scope.getCollection = function() {
		PlayerModel.getCollection();
	};

	$scope.getById = function () {
		PlayerModel.getById($scope.playerId);
	};

	$scope.isMe = function () {
		return PlayerHelper.isMe(PlayerModel.player.id);
	}


});