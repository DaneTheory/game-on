'use strict';

app.controller('PlayerCtrl', function ($scope, $routeParams, PlayerModel) {

	$scope.PlayerModel = PlayerModel;

	$scope.playerId = $routeParams.playerId;

	$scope.getById = function () {
		PlayerModel.getById($scope.playerId);
	};

});