//
//
//

'use strict';

app.controller('PlayerCtrl', function ($scope, $routeParams, PlayerModel, FeedModel, PlayerHelper) {

	$scope.PlayerModel = PlayerModel;
	$scope.PlayerHelper = PlayerHelper;
	$scope.FeedModel = FeedModel;
	
	$scope.playerId = $routeParams.playerId;
	$scope.tab = 1;

	// $scope.getCollection = function() {
	// 	PlayerModel.getCollection();
	// };

	$scope.getById = function () {
		PlayerModel.getById($scope.playerId);
	};

	$scope.isMe = function () {
		return PlayerHelper.isMe(PlayerModel.player.id);
	};


});