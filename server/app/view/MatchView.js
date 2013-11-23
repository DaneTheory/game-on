var _ = require('lodash');

// 
// Join Match
// Add the logged in `Player` to a match.
// 
exports.joinMatch = function (req, res) {

	var matchId = req.route.params.matchId,
		playerId = req.session.passport.user,
		pushNotification = req.app.pushNotification,
		models = req.app.db.base.models,
		Match = models.Match,
		Feed = models.Feed;

	//
	// ### function _join (match)
	// #### @match {object} Match to join the player to.
	// Join a player to a match.
	//
	var _joinMatch = function (match) {
		// Exit if player has already joined this match
		var hasPlayer = _.find(match.players, function (id){
			return id == playerId;
		});
		if (hasPlayer) return res.send(400, 'Player has already joint this match.');

		match.players.push(playerId);
		match.save(function(err, doc){
			if (err) return res.send(500, err);

			Feed.create({
				player: match.organizer,
				type: 'match',
				action: 'joined',
				match: match._id,
				meta: {
					createdBy: playerId
				}
			}, function (err) {
				if (err) return res.send(500, err);

				// Join successful
				return res.send(200);
			});
		});
	};

	// Find the match and join the player
	Match.findById(matchId, function (err, doc){
		if (err) return res.send(500, err);

		_joinMatch(doc);
	});

};

//
// Leave Match
// Remove the logged in `Player` from a match.
// 
exports.leaveMatch = function (req, res) {

	var matchId = req.route.params.matchId,
		playerId = req.session.passport.user,
		pushNotification = req.app.pushNotification,
		models = req.app.db.base.models,
		Match = models.Match;

	//
	// ### function leave (match)
	// #### @match {object} Match to remove the player from.
	// Remove a player from a match.
	//
	var _leave = function (match) {
		match.players.remove(playerId);
		match.save(function(err, doc){
			if (err) return res.send(500, err);
			
			// Send notification to organizer
			pushNotification.emitTo(match.organizer, {
				type: 'MatchLeft',
				meta: {
					playerId: playerId,
					matchId: match._id
				}
			});
			
			// Leave successful
			res.send(200);
		});
	};

	// Find the match and remove the player
	Match.findById(matchId, function (err, doc){
		if (err) return res.send(500, err);

		_leave(doc);
	});

};

//
// New Match
// Creates a new match. (Set the logged in `Player` as the `Organizer`)
// 
exports.newMatch = function (req, res) {

	var playerId = req.session.passport.user,
		models = req.app.db.base.model,
		Match = models.Match;

	var match = new Match();
	match.organizer = playerId;
	// TODO: Add other properties
	match.save(function(err, doc){
		if (err) return res.send(500, err);

		// Success
		res.send(200);
	});

};

//
// Delete Match
// Removes a match if the logged in `Player` is also the `Organizer`.
// 
exports.deleteMatch = function (req, res) {

	var playerId = req.session.passport.user,
		model = req.app.db.base.model,
		Match = maodels.Match;

	var match = new Match();
	Match.findOne({ _id: matchId, organizer: playerId }, function (err, doc){
		if (err) return res.send(500, err);

		// Remove
		doc.remove(function(){
			// Success
			res.send(200);
		});
	});

};