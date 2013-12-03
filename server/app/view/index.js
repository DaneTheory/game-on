var passport = require('passport');

exports = module.exports = function(app) {

	var apiPath = app.get('api-path'),
		devPath = app.get('dev-path'),
		authPath = app.get('auth-path'),
		mongoDbURI = app.get('mongodb-uri');

	// Dev fixtures
	if ('development' == app.get('env')) {
		app.get(devPath + '/fixtures', require('./FixturesView').init);
	}

	// Local Authentication
	app.post(authPath + '/signin', require('./SignInView').localSignIn);
	app.post(authPath + '/signup', require('./SignUpView').localSignUp);
	app.get(authPath + '/signout', require('./SignOutView').signOut);

	// Facebook Authentication
	app.get(authPath + '/signup/facebook', require('./SignUpView').facebookSignUp);
	app.get(authPath + '/signup/facebook/callback', require('./SignUpView').facebookSignUpCallback);
	app.get(authPath + '/signin/facebook', require('./SignInView').facebookSignIn);
	app.get(authPath + '/signin/facebook/callback', require('./SignInView').facebookSignInCallback);

	// Custom Methods (not CRUD)
	// Match
	app.post(apiPath + '/match/:matchId/join', require('./MatchView').join);
	app.post(apiPath + '/match/:matchId/leave', require('./MatchView').leave);
	app.post(apiPath + '/match', require('./MatchView').create);
	app.del(apiPath + '/match', require('./MatchView').delete);

	// Search
	app.get(apiPath + '/search', require('./SearchView').search);

	// Feed
	app.post(apiPath + '/feed/markAsRead/all', require('./FeedView').markAllAsRead);
	app.post(apiPath + '/feed/markAsRead/:feedId', require('./FeedView').markAsRead);
};