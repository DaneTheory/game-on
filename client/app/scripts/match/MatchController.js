'use strict';

app.controller('MatchCtrl', function ($scope, $routeParams, AuthenticationModel, MatchModel) {

	$scope.MatchModel = MatchModel;

	$scope.matchId = $routeParams.matchId;

	$scope.getById = function () {
		MatchModel.getById($scope.matchId);
	};

	$scope.getCollection = function() {
		MatchModel.getCollection();
	};

	$scope.hasJoint = function (players) {
		if (AuthenticationModel.isSignedIn()) {
			return _.find(players, function (player) {
				return player._id == AuthenticationModel.player._id;
			});
		}
	};

	$scope.join = function (match) {
		MatchModel.join(match);
	};

	$scope.leave = function (match) {
		MatchModel.leave(match);
	};

});