var _ = require('lodash');

//
// New Venue
// Creates a new venue. 
//
exports.getById = function (req, res) {

	var authPlayerId = req.session.passport.user,
		models = req.app.db.models,
		playerId = req.route.params.playerId;

	models.Player.findById(playerId).exec(function (err, player) {
		if (err) res.send(err);

		player = player.toObject();
		player.isMe = playerId == authPlayerId;

		return res.send(200, player);
	});

};

