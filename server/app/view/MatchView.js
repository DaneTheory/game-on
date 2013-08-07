var _ = require('lodash');

exports.join = function (req, res) {

	var matchId = req.route.params.matchId,
		playerId = req.session.passport.user,
		models = req.app.db.base.models,
		Match = models.Match;

	var joinPlayer = function (match) {
		var hasPlayer = _.find(match.players, function (id){
			return id == playerId;
		});

		if (hasPlayer) return res.send(400, 'Player has already joint this match.');

		match.players.push(playerId);
		match.save(function(err, doc){
			if (err) return res.send(500, 'Sorry, something went wrong, please try again later.' + '\n' + err);
			res.send(200);
		});
	};

	Match.findById(matchId, function (err, doc){
		if (err) return res.send(400, 'Couln\'t find match with ID ' + matchId + '.');
		joinPlayer(doc);
	});

};

exports.leave = function (req, res) {

	var matchId = req.route.params.matchId,
		playerId = req.session.passport.user,
		models = req.app.db.base.models,
		Match = models.Match;

	var leavePlayer = function (match) {
		match.players.remove(playerId);
		match.save(function(err, doc){
			if (err) return res.send(500, 'Sorry, something went wrong, please try again later.' + '\n' + err);
			res.send(200);
		});
	};

	Match.findById(matchId, function (err, doc){
		if (err) return res.send(400, 'Couln\'t find match with ID ' + matchId + '.');
		leavePlayer(doc);
	});

};