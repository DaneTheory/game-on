'use strict';

app.controller('PlayerCtrl', function ($scope, $routeParams, PlayerService, PlayerModel) {

	$scope.PlayerModel = PlayerModel;

	$scope.playerId = $routeParams.playerId;

	$scope.getById = function () {
		PlayerService.getById($scope.playerId);
	};

});