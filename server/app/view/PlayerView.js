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
		if (err) return res.send(500, err);

		if (player) {
			player = player.toObject();
			player.isMe = playerId == authPlayerId;

			if (!player.isMe) {
				delete player.email;
			}
		}

		return res.send(200, player);
	});
};

exports.update = function (req, res) {

	var authPlayerId = req.session.passport.user,
		models = req.app.db.models,
		playerId = req.route.params.playerId;

	var player = {
		name: req.body.name,
		location: req.body.location,
		bio: req.body.bio,
		rate: req.body.rate,
		gender: req.body.gender,
		email: req.body.email,
		backgroundImageId: req.body.backgroundImageId
	};

	models.Player.findByIdAndUpdate(playerId, player).exec(function (err, doc) {
		if (err) return res.send(500, err);
		return res.send(200, doc);
	});
};