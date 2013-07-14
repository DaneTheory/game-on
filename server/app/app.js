// External includes
var express = require('express'),
	mongoose = require('mongoose'),
	mongoStore = require('connect-mongo')(express),
	http = require('http'),
	path = require('path');

// Instantiate app
var app = express();

// General app config stuff	
app.configure(function () {
	app.set('api_version', 1);
	app.set('api_path', '/api/' + app.get('api_version'))
	app.set('auth_path', app.get('api_path') + '/auth');
	app.set('dev_path', app.get('api_path') + '/dev');

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
	app.use(express.cookieParser());
	app.use(express.session({
		secret: 'f00tb4ll9$',
		maxAge: new Date(Date.now() + 3600000), //1 Hour
		expires: new Date(Date.now() + 3600000), //1 Hour
		store: new mongoStore({ url: app.get('mongodb_uri') })

	}));
	app.use(express.methodOverride());
	
	// Development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}
});

// Internal includes
var cors = require('./middleware/CORSMiddleware')(app),
	auth = require('./middleware/AuthenticationMiddleware')(app),
	views = require('./view/index')(app),
	schemas = require('./schema/index')(app, mongoose);

// Start it all up
var server = http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});

// Sockets
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket, a, b, c) {
	console.log(socket, a,b, c);
	socket.emit('feed', { message: 'Hello world!' });
	
	// socket.on('otherEvent', function (data) {
	// 	console.log(data);
	// });
});