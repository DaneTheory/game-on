exports.init = function (req, res) {

	delete req.session.username;

	var username = req.body.username,
		password = req.body.password,
		name = req.body.name,
		email = req.body.email;

	var validate = function() {
		if (!username) {
			return res.send(400, 'Username required');
		}
		else if (!/^[a-zA-Z0-9\-\_]+$/.test(username)) {
			return res.send(400, 'Username only use letters, numbers, \'-\', \'_\'');
		}

		if (!email) {
			return res.send(400, 'Email required');
		}
		else if (!/^[a-zA-Z0-9\-\_\.\+]+@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z0-9\-\_]+$/.test(email)) {
			return res.send(400, 'Email invalid format');
		}

		if (!password) {
			return res.send(400, 'Password required');
		}

		duplicateUserCheck();
	};
	
	var duplicateUserCheck = function() {
		req.app.db.base.models.Player.findOne({ $or: [
			{ username: username },
			{ email: email }
		]}, function (err, doc) { 
			if (err) return res.send(500, err);
			
			if (doc) {
				if (doc.username === username) {
					return res.send(400, 'Username already taken.');
				} else {
					return res.send(400, 'Email already taken.');
				}
			}

			createUser();
		});
	};
	
	var createUser = function() {
		req.app.db.base.models.Player.create({
			username: username,
			password: req.app.db.base.models.Player.encryptPassword(password),
			name: name,
			email: email
		}, function(err, doc) {
			if (err) return res.send(500, err);
			
			logUserIn();
		});
	};
	
	var logUserIn = function() {
		req._passport.instance.authenticate('local', function(err, player, info) {
			if (err) return res.send(500, err);
			
			if (!player) {
				return res.send(500, 'Sign in failed. That\'s strange.');
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

//  delete req.session.username;

//  var username = req.body.username,
//      password = req.body.password,
//      name = req.body.name,
//      email = req.body.email;
		
//     req.app.db.base.models.Player.findOne({ 
//      $or: [
//          { username: username },
//          { email: email }
//      ]
//  }, function (err, doc){
//      if (doc) {
//          res.send(400, 'User or email address already taken.')
//      } else {
//          var player = new req.app.db.base.models.Player();

//          player.username = username;
//          player.password = password;
//          player.name = name;
//          player.email = email;

//          player.save(function (err, doc) {
//              if (doc) {
//                  req.session.playerId = doc._id;
//                  res.send(200, { player: doc });
//              } else {
//                  res.send(500, 'Sorry, something went wrong, please try again later.' + '\n' + err);
//              }
//          });
//      }
//  });

// };

exports.facebookSignUp = function(req, res, next) {
	req._passport.instance.authenticate('facebook', { callbackURL: 'http://localhost:9000/facebook' }, function(err, user, info) {
		if (!info || !info.profile) return res.send(400, 'Profile not available.');

		req.app.db.base.models.Player.findOne({ 'facebook.id': info.profile.id }, function(err, player) {
			if (err) return next(err);

			if (!player) {
				// Create player
				//req.session.playerId = player._id;

				res.send(200, { player: info.profile });
			} else {
				res.send(400, 'We found a player linked to your Facebook account.');
			}
		});
	})(req, res, next);
};