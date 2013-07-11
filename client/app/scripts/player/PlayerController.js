'use strict';

app.controller('PlayerCtrl', function ($scope, $routeParams, PlayerModel, AuthenticationModel) {

	$scope.PlayerModel = PlayerModel;
	$scope.AuthenticationModel = AuthenticationModel;

	$scope.playerId = $routeParams.playerId;

	$scope.selectPlayer = function () {
		if ($scope.isMe()) {
			$scope.PlayerModel.player = $scope.AuthenticationModel.player;
		} else {
			$scope.getById();
		}
	};

	$scope.isMe = function () {
		return $scope.AuthenticationModel.player._id === $scope.playerId;
	};

	$scope.getCollection = function() {
		PlayerModel.getCollection();
	};

	$scope.getById = function () {
		PlayerModel.getById($scope.playerId);
	};

	$scope.imageUrl = function (player) {
		var hash = player.email ? md5(player.email.trim().toLowerCase()) : '';
		return 'http://www.gravatar.com/avatar/' + hash + '?s=100&d=mm';
	};

});