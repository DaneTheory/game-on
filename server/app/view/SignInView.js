// Local
exports.init = function (req, res) {

	var passport = req._passport.instance;

	var username = req.body.username,
		password = req.body.password;

	var validate = function() {
		if (!username) return res.send(400, 'Playername required');
		if (!password) return res.send(400, 'Password required');

		attemptLogin();
	};
	
	attemptLogin = function() {
		passport.authenticate('local', function(err, player, info) {
			if (err) return res.send(500, err);
			
			if (!player) {
				return res.send(400, 'Playername and password combination not found.');
			} else {
				req.login(player, function(err) {
					if (err) return res.send(500, err);
					
					player.password = undefined;
					player.email = undefined;
					res.send(200, { player: player });
				});
			}
		})(req, res);
	};
	
	validate();
};

// Social
exports.facebookSignIn = function(req, res, next){
	var passport = req._passport.instance,
		origin = req.headers.origin,
		clientFacebookSigninPath = req.app.get('client-facebook-signin-path');
	
	passport.authenticate('facebook', { callbackURL: origin + clientFacebookSigninPath })(req, res, next);
};

exports.facebookSignInCallback = function(req, res, next){
	var Player = req.app.db.base.models.Player,
		passport = req._passport.instance,
		origin = req.headers.origin,
		clientFacebookSigninPath = req.app.get('client-facebook-signin-path');
	
	passport.authenticate('facebook', { callbackURL: origin + clientFacebookSigninPath }, function(err, player, info) {
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
	})(req, res, next);
};