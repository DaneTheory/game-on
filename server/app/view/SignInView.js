exports.init = function (req, res) {

	req.app.db.base.models.Player.findOne({ 
		username: req.body.username, 
		password: req.body.password
	}, 
	function (err, doc){
		if (doc) {
			req.session.playerId = doc._id;
			res.send(200, { player: doc });
		} else {
			res.send(400, 'Incorrect username or password.');
		}
	});
	
};