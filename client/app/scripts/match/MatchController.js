//
// # MatchController.js  
// Match business logic.
//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('MatchCtrl', function ($scope, $routeParams, AuthenticationModel, MatchModel, VenueModel) {

	$scope.MatchModel = MatchModel;
	$scope.VenueModel = VenueModel;
	$scope.AuthenticationModel = AuthenticationModel;

	// Assign the `MatchId` from Url Param into the scope.
	$scope.matchId = $routeParams.matchId;

	$scope.getById = function () {
		MatchModel.getById($scope.matchId);
	};

	$scope.getCollection = function () {
		MatchModel.getCollection();
	};

	$scope.save = function (match) {
		MatchModel.save(match);
	};

	$scope.join = function (match) {
		MatchModel.join(match);
	};

	$scope.leave = function (match) {
		MatchModel.leave(match);
	};

	$scope.isNew = function (match) {
		return !match.id;
	};

	$scope.hasJoint = function (players) {
		if (AuthenticationModel.isSignedIn()) {
			return _.find(players, function (player) {
				return player.id == AuthenticationModel.player.id;
			});
		}
	};

});