'use strict';

app.controller('PlayerCtrl', function ($scope, $routeParams, TokenMatcherHelper,
	PlayerModel, AuthenticationModel) {

	$scope.PlayerModel = PlayerModel;
	$scope.playerId = $routeParams.playerId;

	$scope.getCollection = function() {
		PlayerModel.getCollection();
	};

	$scope.getById = function () {
		PlayerModel.getById($scope.playerId);
	};


});