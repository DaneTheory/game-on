//
// # Sign Up View
//
// 2013 Pablo De Nadai
//

// 
// Local Sign Up workflow.
// 
exports.localSignUp = function (req, res) {

	var Player = req.app.db.models.Player,
		passport = req._passport.instance;

	var password = req.body.password,
		name = req.body.name,
		email = req.body.email;

	// Validate fields.
	var validate = function() {
		if (!name) return res.send(400, 'Name required');
		if (!email) return res.send(400, 'Email address required');
		if (!password) return res.send(400, 'Password required');

		if (!/^[a-zA-Z0-9\-\_\.\+]+@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z0-9\-\_]+$/.test(email)) {
			return res.send(400, 'Invalid email address format');
		}

		duplicateUserCheck();
	};
	
	// Validate if `Player` has already signed up. 
	var duplicateUserCheck = function() {
		Player.findOne({ email: email }, function (err, doc) { 
			if (err) return res.send(500, err);
			if (doc) return res.send(400, 'Email address is already taken.');
			createUser();
		});
	};
	
	// Create new `Player`.
	var createUser = function() {
		Player.create({
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

				if (player) {
					player = player.toObject();
					delete player.password;
				}
		
				return res.send(200, { player: player });
			});
		})(req, res);
	};
	
	// Start up the flow...
	validate();
};




// 
// Social Sign Up workflow.
// 
var signUpSocial = function (req, res, profile) {

	var Player = req.app.db.models.Player,
		passport = req._passport.instance;

	// Create new `Player`.
	var createPlayer = function() {
		var player = {
			name: profile.displayName,
			profile: profile
		};

		if (profile.provider == 'facebook') {
			player.location = profile._json.location.name;

			if (profile._json.gender == 'male') {
				player.gender = 'M';
			} else if (profile._json.gender == 'female') {
				player.gender = 'F';
			}
		} else if (profile.provider == 'twitter') {
			player.location = profile._json.location;
			player.bio = profile._json.description;
		}

		Player.create(player, function(err, doc) {
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
	createPlayer();
};




//
// Facebook Sign Up (Step 1)
// Request token.
//
exports.facebookSignUp = function(req, res, next) {

	var origin = req.headers.origin ? req.headers.origin : '';

	req._passport.instance.authenticate('facebook', {
		display: 'touch', 
		callbackURL: origin + req.app.get('facebook-signup-callback')
	})(req, res, next);

};

//
// Facebook Sign Up (Step 2)
// Validate token.
//
exports.facebookSignUpCallback = function(req, res, next) {

	var Player = req.app.db.models.Player,
		origin = req.headers.origin ? req.headers.origin : '';

	var facebookSignUp = function(err, player, info) {
		if (!info || !info.profile) return res.send(400, 'Profile not available.');

		var profile = info.profile;

		Player.findOne({ 'profile.id': profile.id }, function(err, player) {
			if (err) return next(err);
			if (player) return res.send(400, 'We found a player linked to your Facebook account. Please try signing in.');

			// var username = profile.provider + profile.id;
			// signUpSocial(req, res, username, profile);
			signUpSocial(req, res, profile);
		});
	};

	req._passport.instance.authenticate('facebook', { callbackURL: origin + req.app.get('facebook-signup-callback') }, facebookSignUp)(req, res, next);

};




//
// Twitter Sign Up (Step 1)
// Request token.
//
exports.twitterSignUp = function(req, res, next) {

	var origin = req.headers.origin ? req.headers.origin : '';

	req._passport.instance.authenticate('twitter', {
		callbackURL: origin + req.app.get('twitter-signup-callback')
	})(req, res, next);

};

//
// Twitter Sign Up (Step 2)
// Validate token.
//
exports.twitterSignUpCallback = function(req, res, next) {

	var Player = req.app.db.models.Player,
		origin = req.headers.origin ? req.headers.origin : '';

	var twitterSignUp = function(err, player, info) {
		if (!info || !info.profile) return res.send(400, 'Profile not available.');

		var profile = info.profile;

		Player.findOne({ 'profile.id': profile.id }, function(err, player) {
			if (err) return next(err);
			if (player) return res.send(400, 'We found a player linked to your Twitter account. Please try signing in.');

			// var username = profile.provider + profile.id;
			// signUpSocial(req, res, username, profile);
			signUpSocial(req, res, profile);
		});
	};

	req._passport.instance.authenticate('twitter', { callbackURL: origin + req.app.get('twitter-signup-callback') }, twitterSignUp)(req, res, next);

};

