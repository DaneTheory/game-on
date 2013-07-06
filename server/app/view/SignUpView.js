exports.init = function (req, res) {

	delete req.session.username;

	var username = req.body.username,
		password = req.body.password,
		name = req.body.name,
		email = req.body.email;
    
    req.app.db.base.models.Player.findOne({ 
		$or: [
			{ username: username },
			{ email: email }
		]
	}, function (err, doc){
		if (doc) {
			res.send(400, 'User or email address already taken.')
		} else {
			var player = new req.app.db.base.models.Player();

			player.username = username;
			player.password = password;
			player.name = name;
			player.email = email;

			player.save(function (err, doc) {
				if (doc) {
					req.session.username = req.body.username;
					res.send(200);
				} else {
					res.send(500, 'Sorry, something went wrong, please try again later.' + '\n' + err);
				}
			});
		}
	});

};