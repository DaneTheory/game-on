// External includes
var express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	mongoStore = require('connect-mongo')(express),
	http = require('http'),
	path = require('path');

// Instantiate app
var app = express();

// General app config stuff	
app.configure(function () {
	app.disable('x-powered-by');
  	
  	app.set('api_version', 1);
	app.set('api_path', '/api/' + app.get('api_version'))
	app.set('auth_path', app.get('api_path') + '/auth');
	app.set('dev_path', app.get('api_path') + '/dev');

	// Password encryption
	app.set('crypto_key', 'k3yb0ardc4t');

	// Twitter settings
	app.set('twitter-oauth-key', 'VfE0QYaKm2OcxXC1hXI7hg');
	app.set('twitter-oauth-secret', 'DsJfG1339jeiFCR5fKHvdezRlWYiWl7JaqJKaZGqe8');

	// Github settings
	app.set('github-oauth-key', '');
	app.set('github-oauth-secret', '');

	// Facebook settings
	app.set('facebook-oauth-key', '359014320866601');
	app.set('facebook-oauth-secret', 'dbd46c18e7cf3b71099d43ad4b08a3e4');

	// Setup mongoose
	app.set('mongodb_uri', process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/footballjs94');
	app.db = mongoose.createConnection(app.get('mongodb_uri'));
	app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
	app.db.once('open', function () {
		console.log('mongoose open for business');
	});

	app.set('port', process.env.PORT || 3000);

	// Middlewares
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({
		secret: 'f00tb4ll9$',
		store: new mongoStore({ url: app.get('mongodb_uri') })

	}));
	app.use(passport.initialize());
	app.use(passport.session());
	
	// Development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}
});

// Internal includes
var middlewares = require('./middleware/index')(app),
	views = require('./view/index')(app),
	schemas = require('./schema/index')(app, mongoose),
	strategies = require('./passport/index')(app, passport);

// Start it all up
var server = http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});

// Socket IO (Push Notification)
// var io = require('socket.io').listen(server);
// io.sockets.on('connection', function (socket) {

// 	// TODO: Trigger notification by user (See Passport and Socket IO)
// 	socket.emit('feed', { message: 'Hello world!' });
	
// 	// socket.on('otherEvent', function (data) {
// 	// 	console.log(data);
// 	// });
// });