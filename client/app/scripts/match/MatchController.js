'use strict';

app.controller('MatchCtrl', function ($scope, $routeParams, MatchModel) {

	$scope.MatchModel = MatchModel;

	$scope.matchId = $routeParams.matchId;

	$scope.getById = function () {
		MatchModel.getById($scope.matchId);
	};

});