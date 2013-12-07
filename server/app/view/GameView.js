//
// # Game View
//
// 2013 Pablo De Nadai
//

var _ = require('lodash');

// 
// Join Game
// Add the logged in `Player` to a game.
// 
exports.join = function (req, res) {

	var gameId = req.route.params.gameId,
		playerId = req.session.passport.user,
		pushNotification = req.app.pushNotification,
		models = req.app.db.models,
		Game = models.Game,
		Feed = models.Feed,
		Player = models.Player;

	//
	// ### function _join (game)
	// #### @game {object} Game to join the player to.
	// Join a player to a game.
	//
	var _join = function (game) {
		// Exit if player has already joined this game
		var hasPlayer = _.find(game.players, function (id){
			return id == playerId;
		});
		if (hasPlayer) return res.send(400, 'Player has already joint this game.');

		game.players.push(playerId);
		game.save(function(err, doc){
			if (err) return res.send(500, err);

			// TODO: Should be using async!!!
			// Update games played
			Player.findByIdAndUpdate(playerId, { $inc: { gamesPlayed: 1 } }, function (err) {
				if (err) return res.send(500, err);
			});

			// Send notification to organizer
			if (playerId != doc.organizer) {
				Feed.create({
					player: game.organizer,
					type: 'game',
					action: 'joined',
					game: game._id,
					meta: {
						createdBy: playerId
					}
				}, function (err) {
					if (err) return res.send(500, err);
				});
			}
			
			// Join successful
			return res.send(200);
		});
	};

	// Find the game and join the player
	Game.findById(gameId, function (err, doc){
		if (err) return res.send(500, err);

		_join(doc);
	});

};

//
// Leave Game
// Remove the logged in `Player` from a game.
// 
exports.leave = function (req, res) {

	var gameId = req.route.params.gameId,
		playerId = req.session.passport.user,
		pushNotification = req.app.pushNotification,
		models = req.app.db.models,
		Game = models.Game,
		Feed = models.Feed,
		Player = models.Player;

	//
	// ### function leave (game)
	// #### @game {object} Game to remove the player from.
	// Remove a player from a game.
	//
	var _leave = function (game) {
		game.players.remove(playerId);
		game.save(function(err, doc){
			if (err) return res.send(500, err);

			// TODO: Should be using async!!!
			// Update games played
			Player.findByIdAndUpdate(playerId, { $inc: { gamesPlayed: -1 } }, function (err) {
				if (err) return res.send(500, err);
			});

			// Send notification to organizer
			if (playerId != doc.organizer) {
				Feed.create({
					player: game.organizer,
					type: 'game',
					action: 'left',
					game: game._id,
					meta: {
						createdBy: playerId
					}
				}, function (err) {
					if (err) return res.send(500, err);
				});
			}

			return res.send(200);
		});
	};

	// Find the game and remove the player
	Game.findById(gameId, function (err, doc){
		if (err) return res.send(500, err);

		_leave(doc);
	});

};

//
// New Game
// Creates a new game. (Set the logged in `Player` as the `Organizer`)
// 
exports.create = function (req, res) {

	var playerId = req.session.passport.user,
		models = req.app.db.models,
		Game = models.Game,
		Player = models.Player;

	var game = new Game();

	// TODO: Validate data.
	game.organizer = playerId;
	game.description = req.body.description;
	game.venue = req.body.venue._id;
	game.coordinates = req.body.venue.coordinates;
	game.players = [ playerId ];
	game.when = req.body.when;
	game.price = req.body.price;
	game.maxPlayers = req.body.maxPlayers;
	game.gender = req.body.gender;

	game.meta.createdAt = new Date;

	game.save(function(err, doc){
		if (err) return res.send(500, err);

		Player.findByIdAndUpdate(playerId, { $inc: { gamesOrganized: 1, gamesPlayed: 1 } }, function (err) {
			if (err) return res.send(500, err);
		});

		// Created
		return res.send(201);
	});

};