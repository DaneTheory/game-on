'use strict';

app.controller('PlayerCollectionCtrl', function ($scope, PlayerModel) {

	$scope.PlayerModel = PlayerModel;

	$scope.getCollection = function() {
		PlayerModel.getCollection();
	};

});