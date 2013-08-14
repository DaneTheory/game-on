//
// # MatchController.js  
// Match business logic.
//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('MatchCtrl', function ($scope, $routeParams, AuthenticationModel, MatchModel) {

	$scope.MatchModel = MatchModel;

	// Assign the `MatchId` from Url Param into the scope.
	$scope.matchId = $routeParams.matchId;

	
	$scope.getById = function () {
		MatchModel.getById($scope.matchId);
	};

	$scope.getCollection = function() {
		MatchModel.getCollection();
	};

	$scope.isNew = function (match) {
		return !match._id;
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