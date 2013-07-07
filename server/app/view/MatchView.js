var _ = require('lodash');

exports.join = function (req, res) {

	var matchId = req.route.params.matchId,
		playerId = req.session.playerId,
		models = req.app.db.base.models,
		Match = models.Match;

	var joinPlayer = function (match) {
		var hasPlayer = _.find(match.players, function (id){
			return id == playerId;
		});

		if (!hasPlayer) {
			match.players.push(playerId);
			match.save(function(err, doc){
				if (doc) {
					res.send(200);
				} else {
					res.send(500, 'Sorry, something went wrong, please try again later.' + '\n' + err);
				}
				
			});
		} else {
			res.send(400, 'Player has already joint this match.');
		}
	};

	Match.findById(matchId, function (err, doc){
		if (doc) {
			joinPlayer(doc);
		} else {
			res.send(400, 'Couln\'t find match with ID ' + matchId + '.');
		}
	});

};

exports.leave = function (req, res) {

	var matchId = req.route.params.matchId,
		playerId = req.session.playerId,
		models = req.app.db.base.models,
		Match = models.Match;

	var leavePlayer = function (match) {
		match.players.remove(playerId);
		match.save(function(err, doc){
			if (doc) {
				res.send(200);
			} else {
				res.send(500, 'Sorry, something went wrong, please try again later.' + '\n' + err);
			}
			
		});
	};

	Match.findById(matchId, function (err, doc){
		if (doc) {
			leavePlayer(doc);
		} else {
			res.send(400, 'Couln\'t find match with ID ' + matchId + '.');
		}
	});

};