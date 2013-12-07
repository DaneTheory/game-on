// External includes
var express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	mongoStore = require('connect-mongo')(express),
	http = require('http'),
	path = require('path');

// Instantiate app
var app = express();

// Setup mongoose
app.set('mongodb-uri', process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/gameon');
app.db = mongoose.connect(app.get('mongodb-uri'));
app.db.connection.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.connection.once('open', function () {
	console.log('mongoose open for business');
});

// Session - mongoStore
var sessionStore = new mongoStore({ url: app.get('mongodb-uri') });

// General app config stuff 
app.configure(function () {
	app.disable('x-powered-by');
	
	app.set('api-version', 1);
	app.set('api-path', '/api/' + app.get('api-version')) // Requires Auth.
	app.set('auth-path', app.get('api-path') + '/auth'); // Auth-free.
	app.set('dev-path', app.get('api-path') + '/dev'); // Auth-free.

	// Facebook authentication callback path.
	app.set('facebook-signup-callback', '/auth/social?action=signup&provider=facebook');
	app.set('facebook-signin-callback', '/auth/social?action=signin&provider=facebook');
	app.set('twitter-signup-callback', '/auth/social?action=signup&provider=twitter');
	app.set('twitter-signin-callback', '/auth/social?action=signin&provider=twitter');

	// Password encryption
	app.set('crypto-key', 'k3yb0ardc4t');
	app.set('session-secret', 'f00tb4ll9$');

	app.set('port', process.env.PORT || 3000);

	// Middlewares
	app.use(express.logger('dev'));
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());

	app.use(express.session({
		secret: app.get('session-secret'),
		store: sessionStore

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
var socketIo = require('socket.io').listen(server),
	passportSocketIo = require('passport.socketio');

// Except for the optional fail and success the parameter object has the 
// Same attribute than the session middleware http://www.senchalabs.org/connect/middleware-session.html
socketIo.set('authorization', passportSocketIo.authorize({
	cookieParser: express.cookieParser,         // Or connect.cookieParser
	key: 'connect.sid',                         // The cookie where express (or connect) stores its session id.
	secret: app.get('session-secret'),          // The session secret to parse the cookie
	store: sessionStore,                        // The session store that express uses
	fail: function(data, accept) {           	// *optional* callbacks on success or fail
	     accept(null, false);                	// Second param takes boolean on whether or not to allow handshake
	},
	success: function(data, accept) {
	     accept(null, true);
	}
 }));

app.pushNotification = require('./helper/PushNotificationHelper')(socketIo);