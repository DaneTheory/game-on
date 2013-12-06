//
// # Game Controller  
// Game business logic.
//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('GameReadCtrl', function ($scope, AuthenticationService, GameService) {

	$scope.join = function (game) {
		GameService.join(game).then(function () {
			game.players.push(AuthenticationService.player);
		});
	};

	$scope.leave = function (game) {
		GameService.leave(game).then(function () {
			// Find signed in player within the players list.
			var playerIndex = _.findIndex(game.players, function (player) {
				return player.id == AuthenticationService.player.id;
			});

			// Remove player from players list.
			if (playerIndex > -1) {
				game.players.splice(playerIndex, 1);
			}
		});
	};

	$scope.hasJoint = function (players) {
		if (AuthenticationService.isSignedIn()) {
			return _.find(players, function (player) {
				return player.id == AuthenticationService.player.id;
			});
		}
	};

});