'use strict';

app.controller('PlayerCollectionCtrl', function ($scope, PlayerModel, PlayerService) {

	$scope.PlayerModel = PlayerModel;

	$scope.getCollection = function() {
		PlayerService.getCollection();
	};

});