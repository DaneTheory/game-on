var mers = require('mers');

exports = module.exports = function(app) {

	var apiPath = app.get('api_path'),
		devPath = app.get('dev_path'),
		authPath = app.get('auth_path'),
		mongoDbURI = app.get('mongodb_uri');

	// Dev fixtures
	if ('development' == app.get('env')) {
		app.get(devPath + '/fixtures', require('./FixturesView').init);
	}

	// Authentication
	app.post(authPath + '/signin', require('./SignInView').init);
	app.post(authPath + '/signup', require('./SignUpView').init);
	app.get(authPath + '/signout', require('./SignOutView').init);
	
	// Listings
	app.use(apiPath, mers({ uri: mongoDbURI }).rest());

	// Methods
	app.post(apiPath + '/match/:matchId/join', require('./MatchView').join);
	//app.post(apiPath + '/match/:matchId/unjoin', require('./MatchView').unjoin);

};