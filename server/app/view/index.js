var mers = require('mers'),
	passport = require('passport');

exports = module.exports = function(app) {

	var apiPath = app.get('api-path'),
		devPath = app.get('dev-path'),
		authPath = app.get('auth-path'),
		mongoDbURI = app.get('mongodb-uri');

	// Dev fixtures
	if ('development' == app.get('env')) {
		app.get(devPath + '/fixtures', require('./FixturesView').init);
	}

	// Authentication
	app.post(authPath + '/signin', require('./SignInView').init);
	app.post(authPath + '/signup', require('./SignUpView').init);
	app.get(authPath + '/signout', require('./SignOutView').init);

	app.get(authPath + '/signup/facebook', require('./SignUpView').facebookSignUp);
	app.get(authPath + '/signup/facebook/callback', require('./SignUpView').facebookSignUpCallback);
	
	app.get(authPath + '/signin/facebook', require('./SignInView').facebookSignIn);
	app.get(authPath + '/signin/facebook/callback', require('./SignInView').facebookSignInCallback);

	// Listings (mers)
	app.use(apiPath, mers({ uri: mongoDbURI }).rest());

	// Methods
	app.post(apiPath + '/match/:matchId/join', require('./MatchView').join);
	app.post(apiPath + '/match/:matchId/leave', require('./MatchView').leave);

};