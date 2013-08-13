// 
// Local Sign Up workflow.
// 
exports.localSignUp = function (req, res) {

	var Player = req.app.db.base.models.Player,
		passport = req._passport.instance;

	var username = req.body.username,
		password = req.body.password,
		name = req.body.name,
		email = req.body.email;

	// Validate fields.
	var validate = function() {
		if (!username) return res.send(400, 'Username required');
		if (!name) return res.send(400, 'Name required');
		if (!email) return res.send(400, 'Email required');
		if (!password) return res.send(400, 'Password required');

		if (!/^[a-zA-Z0-9\-\_]+$/.test(username)) {
			return res.send(400, 'Username only use letters, numbers, \'-\', \'_\'');
		}

		if (!/^[a-zA-Z0-9\-\_\.\+]+@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z0-9\-\_]+$/.test(email)) {
			return res.send(400, 'Email invalid format');
		}

		duplicateUserCheck();
	};
	
	// Validate if `Player` has already signed up. 
	var duplicateUserCheck = function() {
		Player.findOne({ $or: [
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
	
	// Create new `Player`.
	var createUser = function() {
		Player.create({
			username: username,
			password: Player.encryptPassword(password),
			name: name,
			email: email
		}, function(err, doc) {
			if (err) return res.send(500, err);
			
			signIn();
		});
	};
	
	// Sign In.
	var signIn = function() {
		passport.authenticate('local', function(err, player, info) {
			if (err) return res.send(500, err);
			if (!player) return res.send(500, 'Sign in failed. That\'s strange.');

			req.login(player, function(err) {
				if (err) return res.send(500, err);
		
				player.password = undefined;
				player.email = undefined;
				res.send(200, { player: player });
			});
		})(req, res);
	};
	
	// Start up the flow...
	validate();
};




// 
// Social Sign Up workflow.
// 
var signUpSocial = function (req, res, username, profile) {

	var Player = req.app.db.base.models.Player,
		passport = req._passport.instance;

	// Validate info.
	var validate = function() {
		if (!username) return res.send(400, 'Username required');
		
		if (!/^[a-zA-Z0-9\-\_]+$/.test(username)) {
			return res.send(400, 'Username only use letters, numbers, \'-\', \'_\'');
		}

		duplicateUserCheck();
	};
	
	// Validade duplicate.
	var duplicateUserCheck = function() {
		Player.findOne({ username: username }, function (err, doc) {
			if (err) return res.send(500, err);
			if (doc) return res.send(400, 'Username already taken.');

			createUser();
		});
	};
	
	// Create new `Player`.
	var createUser = function() {
		Player.create({
			username: username,
			profile: profile,
		}, function(err, doc) {
			if (err) return res.send(500, err);
			
			signIn(doc);
		});
	};
	
	// Sign in new `Player`.
	var signIn = function(player) {
		req.login(player, function(err) {
			if (err) return res.send(500, err);

			res.send(200, { player: player });
		});
	};
	
	// Start the flow...
	validate();
};

//
// Facebook Sign Up (Step 1)
// Request token.
//
exports.facebookSignUp = function(req, res, next) {
	
	var passport = req._passport.instance,
		callbackUrl = [
			req.headers.origin,
			req.app.get('facebook-signup-callback')
		].join('');

	passport.authenticate('facebook', {
		display: 'touch', 
		callbackURL: callbackUrl
	})(req, res, next);

};

//
// Facebook Sign Up (Step 2)
// Validate token.
//
exports.facebookSignUpCallback = function(req, res, next) {

	var Player = req.app.db.base.models.Player,
		passport = req._passport.instance,
		callbackUrl = [
			req.headers.origin,
			req.app.get('facebook-signup-callback')
		].join('');

	var facebookSignUp = function(err, player, info) {
		if (!info || !info.profile) return res.send(400, 'Profile not available.');

		var profile = info.profile;

		Player.findOne({ 'profile.id': profile.id }, function(err, player) {
			if (err) return next(err);
			if (player) return res.send(400, 'We found a player linked to your Facebook account. Please try signing in.');

			var username = profile.provider + profile.id;
			signUpSocial(req, res, username, profile);
		});
	};

	passport.authenticate('facebook', { callbackURL: callbackUrl }, facebookSignUp)(req, res, next);

};