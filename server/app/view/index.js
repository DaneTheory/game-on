var mers = require('mers');

exports = module.exports = function(app) {

	var apiPath = app.get('api_path'),
		devPath = app.get('dev_path'),
		authPath = app.get('auth_path'),
		mongoDbURI = app.get('mongodb_uri');

	app.post(authPath + '/signin', require('./SignInView').init);
	app.get(authPath + '/signout', require('./SignOutView').init);

	if ('development' == app.get('env')) {
		app.get(devPath + '/fixtures', require('./FixturesView').init);
	}

	app.use(apiPath, mers({ uri: mongoDbURI }).rest());

};