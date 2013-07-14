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
	
	// var sendWelcomeEmail = function() {
	// 	req.app.utility.email(req, res, {
	// 		from: req.app.get('email-from-name') +' <'+ req.app.get('email-from-address') +'>',
	// 		to: req.body.email,
	// 		subject: 'Your '+ req.app.get('project-name') +' Account',
	// 		textPath: 'signup/email-text',
	// 		htmlPath: 'signup/email-html',
	// 		locals: {
	// 			username: req.body.username,
	// 			email: req.body.email,
	// 			loginURL: 'http://'+ req.headers.host +'/login/',
	// 			projectName: req.app.get('project-name')
	// 		},
	// 		success: function(message) {
	// 			workflow.emit('logUserIn');
	// 		},
	// 		error: function(err) {
	// 			console.log('Error Sending Welcome Email: '+ err);
	// 			workflow.emit('logUserIn');
	// 		}
	// 	});
	// });
	
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