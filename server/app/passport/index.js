exports = module.exports = function(app, passport) {
	var LocalStrategy = require('passport-local').Strategy,
		GitHubStrategy = require('passport-github').Strategy,
		TwitterStrategy = require('passport-twitter').Strategy,
		FacebookStrategy = require('passport-facebook').Strategy;
	
	// Local
	passport.use(new LocalStrategy(function(username, password, done) {
		// Lookup conditions
		var conditions = {};
		if (username.indexOf('@') === -1) {
			conditions.username = username;
		} else {
			conditions.email = username;
		}
		
		app.db.base.models.Player.findOne(conditions, function(err, player) {
			if (err) return done(err);
			if (!player) return done(null, false, { message: 'Unknown player' });
			
			// Validate password
			var encryptedPassword = app.db.base.models.Player.encryptPassword(password);
			if (player.password != encryptedPassword) {
				return done(null, false, { message: 'Invalid password' });
			}
			
			// We're good
			return done(null, player);
		});
	}));
	
	// Twitter
	if (app.get('twitter-oauth-key')) {
		passport.use(new TwitterStrategy({
			consumerKey: app.get('twitter-oauth-key'),
			consumerSecret: app.get('twitter-oauth-secret')
		},
		function(token, tokenSecret, profile, done) {
			// Hand off to caller
			done(null, false, {
				token: token,
				tokenSecret: tokenSecret,
				profile: profile
			});
		}));
	}
	
	// Github
	if (app.get('github-oauth-key')) {
		passport.use(new GitHubStrategy({
			clientID: app.get('github-oauth-key'),
			clientSecret: app.get('github-oauth-secret'),
			customHeaders: { "User-Agent": app.get('project-name') }
		},
		function(accessToken, refreshToken, profile, done) {
			// Hand off to caller
			done(null, false, {
				accessToken: accessToken,
				refreshToken: refreshToken,
				profile: profile
			});
		}));
	}
	
	// Facebook
	if (app.get('facebook-oauth-key')) {
		passport.use(new FacebookStrategy({
			clientID: app.get('facebook-oauth-key'),
			clientSecret: app.get('facebook-oauth-secret')
		},
		function(accessToken, refreshToken, profile, done) {
			// Hand off to caller
			done(null, false, {
				accessToken: accessToken,
				refreshToken: refreshToken,
				profile: profile
			});
		}));
	}
	
	// Serialize
	passport.serializeUser(function(player, done) {
		done(null, player._id);
	});
	
	// Deserialize
	passport.deserializeUser(function(id, done) {
		app.db.base.models.Player.findOne({ _id: id }).exec(function(err, player) {
			done(err, player);
		});
	});
};