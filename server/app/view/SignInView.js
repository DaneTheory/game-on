// 
// Local Sign In
// 
exports.localSignIn = function (req, res) {

	var passport = req._passport.instance,
		email = req.body.email,
		password = req.body.password;

	// Validate `email` and `password`.
	var validate = function() {
		if (!email) return res.send(400, 'Email address required');
		if (!password) return res.send(400, 'Password required');

		attemptLogin();
	};
	
	// Try to login with the given credentials.
	attemptLogin = function() {
		passport.authenticate('local', function(err, player, info) {
			if (err) return res.send(500, err);
			if (!player) return res.send(400, 'Email address and password combination not found.');

			req.login(player, function(err) {
				if (err) return res.send(500, err);

				if (player) {
					player = player.toObject();
					delete player.password;
				}

				return res.send(200, { player: player });
			});
		})(req, res);
	};
	
	validate();
};



// 
// Facebook Sign In (Step 1)
// Request token.
// 
exports.facebookSignIn = function(req, res, next){
	
	var passport = req._passport.instance,
		callbackUrl = [
			req.headers.origin,
			req.app.get('facebook-signin-callback')
		].join('');
	
	// Attempt Facebook login
	passport.authenticate('facebook', {
		display: 'touch', 
		callbackURL: callbackUrl
	})(req, res, next);

};

// 
// Facebook Sign In (Step 2)
// Validate token.
// 
exports.facebookSignInCallback = function(req, res, next){
	
	var Player = req.app.db.models.Player,
		passport = req._passport.instance,
		callbackUrl = [
			req.headers.origin,
			req.app.get('facebook-signin-callback')
		].join('');
	
	var facebookSignIn = function (err, player, info) {
		if (!info || !info.profile) return res.send(400, 'Profile not available.');
		
		var profile = info.profile;

		Player.findOne({ 'profile.id': profile.id }, function(err, player) {
			if (err) return next(err);
			if (!player) return res.send(400, 'No players found linked to your Facebook account. You may need to create an account first.');

			req.login(player, function(err) {
				if (err) return res.send(500, err);
				
				player.password = undefined;
				res.send(200, { player: player });
			});
		});
	}

	passport.authenticate('facebook', { callbackURL: callbackUrl }, facebookSignIn)(req, res, next);
};