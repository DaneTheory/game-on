//
// # MatchController.js  
// Match business logic.
//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('MatchCtrl', function ($scope, $routeParams, AuthenticationModel, MatchModel) {

	$scope.MatchModel = MatchModel;
	$scope.AuthenticationModel = AuthenticationModel;

	// Assign the `MatchId` from Url Param into the scope.
	$scope.matchId = $routeParams.matchId;

	$scope.join = function (match) {
		MatchModel.join(match).then(function () {
			match.players.push(AuthenticationModel.player);
		});
	};

	$scope.leave = function (match) {
		MatchModel.leave(match).then(function () {
			// Find signed in player within the players list.
			var playerIndex = _.findIndex(match.players, function (player) {
				return player.id == AuthenticationModel.player.id;
			});

			// Remove player from players list.
			if (playerIndex > -1) {
				match.players.splice(playerIndex, 1);
			}
		});
	};

	$scope.hasJoint = function (players) {
		if (AuthenticationModel.isSignedIn()) {
			return _.find(players, function (player) {
				return player.id == AuthenticationModel.player.id;
			});
		}
	};

});