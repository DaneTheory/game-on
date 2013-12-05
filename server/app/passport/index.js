//
// ### Passport Authentication
// 
exports = module.exports = function(app, passport) {
	var env = require('./../env')(),
		LocalStrategy = require('passport-local').Strategy,
		FacebookStrategy = require('passport-facebook').Strategy;
		TwitterStrategy = require('passport-twitter').Strategy;
	
	// Local Strategy
	passport.use(new LocalStrategy({
		usernameField: 'email',
    	passwordField: 'password'
  	},
  	function(email, password, done) {
		// Find a player with given email
		app.db.models.Player.findOne({ email: email }, '+password', function(err, player) {
			if (err) return done(err);
			if (!player) return done(null, false, { message: 'Unknown player' });
			
			// Validate password
			var encryptedPassword = app.db.models.Player.encryptPassword(password);
			if (player.password != encryptedPassword) {
				return done(null, false, { message: 'Invalid password' });
			}
			
			// We're good
			return done(null, player);
		});
	}));
	
	// Facebook Strategy
	if (env['facebook-oauth-key']) {
		passport.use(new FacebookStrategy({
			clientID: env['facebook-oauth-key'],
			clientSecret: env['facebook-oauth-secret']
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

	// Twitter Strategy
 	if (env['twitter-oauth-key']) {
    	passport.use(new TwitterStrategy({
        	consumerKey: env['twitter-oauth-key'],
        	consumerSecret: env['twitter-oauth-secret']
      	},
      	function(token, tokenSecret, profile, done) {
        	done(null, false, {
          		token: token,
          		tokenSecret: tokenSecret,
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
		app.db.models.Player.find({ _id: id }).exec(function(err, player) {
			return done(err, player);
		});
	});
};