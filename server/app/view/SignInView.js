exports.init = function (req, res) {

	var validate = function() {
		if (!req.body.username) {
			return res.send(400, 'Username required');
		}

		if (!req.body.password) {
			return res.send(400, 'Password required');
		};

		attemptLogin();
	};
	
	attemptLogin = function() {
		req._passport.instance.authenticate('local', function(err, player, info) {
			if (err) return res.send(500, err);
			
			if (!player) {
				return res.send(400, 'Username and password combination not found.');
			} else {
				req.login(player, function(err) {
					if (err) return res.send(500, err);
					
					req.session.playerId = player._id;
					player.password = undefined;
					player.email = undefined;
					res.send(200, { player: player });
				});
			}
		})(req, res);
	};
	
	validate();
};

// exports.init = function (req, res) {

// 	req.app.db.base.models.Player.findOne({ 
// 		username: req.body.username, 
// 		password: req.body.password
// 	}, 
// 	function (err, doc){
// 		if (doc) {
// 			req.session.playerId = doc._id;
// 			res.send(200, { player: doc });
// 		} else {
// 			res.send(400, 'Incorrect username or password.');
// 		}
// 	});
	
// };