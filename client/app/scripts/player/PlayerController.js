//
//
//

'use strict';

app.controller('PlayerCtrl', function ($scope, $routeParams, PlayerModel, PlayerHelper) {

	$scope.PlayerModel = PlayerModel;
	$scope.PlayerHelper = PlayerHelper;
	
	$scope.playerId = $routeParams.playerId;

	$scope.getCollection = function() {
		PlayerModel.getCollection();
	};

	$scope.getById = function () {
		PlayerModel.getById($scope.playerId);
	};


});