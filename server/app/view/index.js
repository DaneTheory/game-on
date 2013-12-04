var passport = require('passport'),
	fixturesView = require('./FixturesView'),
	signInView = require('./SignInView'),
	signUpView = require('./SignUpView'),
	signOutView = require('./SignOutView'),
	matchView = require('./MatchView'),
	venueView = require('./VenueView'),
	playerView = require('./PlayerView'),
	searchView = require('./SearchView'),
	feedView = require('./FeedView');

exports = module.exports = function(app) {

	var apiPath = app.get('api-path'),
		devPath = app.get('dev-path'),
		authPath = app.get('auth-path'),
		mongoDbURI = app.get('mongodb-uri');

	// Dev fixtures
	if ('development' == app.get('env')) {
		app.get(devPath + '/fixtures', fixturesView.init);
	}

	// Local Authentication
	app.post(authPath + '/signin', 					signInView.localSignIn);
	app.post(authPath + '/signup', 					signUpView.localSignUp);
	app.get(authPath + '/signout', 					signOutView.signOut);

	// Facebook Authentication
	app.get(authPath + '/signup/facebook', 			signUpView.facebookSignUp);
	app.get(authPath + '/signup/facebook/callback', signUpView.facebookSignUpCallback);
	app.get(authPath + '/signin/facebook',			signInView.facebookSignIn);
	app.get(authPath + '/signin/facebook/callback', signInView.facebookSignInCallback);

	// Player
	app.get(apiPath + '/player/:playerId',			playerView.getById);

	// Match
	app.post(apiPath + '/match/:matchId/join', 		matchView.join);
	app.post(apiPath + '/match/:matchId/leave', 	matchView.leave);
	app.post(apiPath + '/match', 					matchView.create);
	app.del(apiPath + '/match', 					matchView.delete);

	// Player
	app.post(apiPath + '/venue',					venueView.create);
	app.get(apiPath + '/venue/near',				venueView.near);

	// Search
	app.get(apiPath + '/search', 					searchView.search);

	// Feed
	app.get(apiPath + '/feed', 						feedView.getFeeds);
	app.post(apiPath + '/feed/markAsRead/all', 		feedView.markAllAsRead);
	app.post(apiPath + '/feed/markAsRead/:feedId', 	feedView.markAsRead);
};