var passport = require('passport'),
	fixturesView = require('./FixturesView'),
	signInView = require('./SignInView'),
	signUpView = require('./SignUpView'),
	signOutView = require('./SignOutView'),
	gameView = require('./GameView'),
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
	app.get(authPath + '/signup/twitter', 			signUpView.twitterSignUp);
	app.get(authPath + '/signup/twitter/callback', 	signUpView.twitterSignUpCallback);

	app.get(authPath + '/signin/facebook',			signInView.facebookSignIn);
	app.get(authPath + '/signin/facebook/callback', signInView.facebookSignInCallback);
	app.get(authPath + '/signin/twitter',			signInView.twitterSignIn);
	app.get(authPath + '/signin/twitter/callback',  signInView.twitterSignInCallback);

	// Player
	app.get(apiPath + '/player/:playerId',			playerView.getById);
	app.put(apiPath + '/player/:playerId',			playerView.update);

	// Game
	app.post(apiPath + '/game/:gameId/join', 		gameView.join);
	app.post(apiPath + '/game/:gameId/leave', 		gameView.leave);
	app.post(apiPath + '/game', 					gameView.create);

	// Venue
	app.post(apiPath + '/venue',					venueView.create);
	app.get(apiPath + '/venue/near',				venueView.near);

	// Search
	app.get(apiPath + '/search', 					searchView.search);

	// Feed
	app.get(apiPath + '/feed', 						feedView.getFeeds);
	app.post(apiPath + '/feed/markAsRead/all', 		feedView.markAllAsRead);
	app.post(apiPath + '/feed/markAsRead/:feedId', 	feedView.markAsRead);
};