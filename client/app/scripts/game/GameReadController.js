//
// # Game Controller  
// Game business logic.
//
// 2013 Pablo De Nadai
//

'use strict';

app.controller('GameReadCtrl', function ($scope, AuthenticationService, GameService) {

	//
	// ### function join (game)
	// #### @game {object} Game instance
	// Add the current player to the list for players.
	//
	$scope.join = function (game) {
		GameService.join(game).then(function () {
			game.players.push(AuthenticationService.player);
		});
	};

	//
	// ### function leave (game)
	// #### @game {object} Game instance
	// Remove the current player to the list for players.
	//
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

	//
	// ### function hasJoint (players)
	// #### @players {array} List if players in a given game
	// Returns `true` if the current player is in the list.
	//
	$scope.hasJoint = function (players) {
		if (AuthenticationService.isSignedIn()) {
			return _.find(players, function (player) {
				return player.id == AuthenticationService.player.id;
			});
		}
	};

});