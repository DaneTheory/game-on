/**
 * Module dependencies.
 */
var express = require('express'),
    http = require('http'),
    path = require('path'),
    _ = require('lodash');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
            secret: 'something',
            maxAge: new Date(Date.now() + 3600000), //1 Hour
            expires: new Date(Date.now() + 3600000), //1 Hour
            store: new express.session.MemoryStore
        }));
app.use(express.methodOverride());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://pablodenadai.github.io/");
    res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(function(req, res, next){
    if (_.contains(req.url, '/rest') && !req.session.user_id) {
        res.send(401, 'You are not authorized to view this page');
    } else {
        next();
    }
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/users', function (req, res) {
    res.json([{
                'name': 'Pablo'
            }, {
                'name': 'De'
            }, {
                'name': 'Nadai'
            }
        ]);
});

app.post('/login', function (req, res) {
    var post = req.body;
    if (post.user == '123' && post.password == '123') {
        req.session.user_id = post.user;
        res.send(200);
    } else {
        res.send(401, 'Bad user/pass');
    }
});

app.get('/logout', function (req, res) {
    delete req.session.user_id;
    res.send(200);
});


var mers = require('mers');
app.use('/rest', mers({
            uri: 'mongodb://localhost/rest_example_prod'
        }).rest());

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId;


var Player = new Schema({
        displayName: {
            type: String,
            required: true
        },
        realName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        location: {
            type: String
        }
    });

var Venue = new Schema({
        name: {
            type: String,
            required: true
        },
        location: {
            type: Array
        }
    });
Venue.index({
        location: '2d'
    });

// http://localhost:3000/rest/venue/finder/near?location=-37.648792,145.19104&maxDistance=100
// coordinates = lat, lon
// maxDistance = km
Venue.statics.near = function (q, term) {
    var coordinates = q.location.split(',').map(Number);
    var maxDistance = q.maxDistance;
    return this.find({
            'location': {
                $near: coordinates,
                $maxDistance: maxDistance / 111.12
            }
        });
};

var Match = new Schema({
        venue: {
            type: Schema.ObjectId,
            ref: 'Venue'
        },
        players: [{
                type: ObjectId,
                ref: 'Player'
            }
        ],
        when: {
            type: Date,
            default: Date.now
        },
        price: {
            type: Number
        },
        organizer: {
            type: ObjectId,
            ref: 'Player'
        },

        meta: {
            created: {
                type: Date,
                default: Date.now
            },
            modified: {
                type: Date,
                default: Date.now
            }
        }
    });
Match.statics.organizer = function (q, term) {
    return this.find({
            'organizer': term
        });
};
Match.statics.player = function (q, term) {
    return this.find({
            'players': term
        });
};
Match.statics.venue = function (q, term) {
    return this.find({
            'venue': term
        });
};

var PlayerModel = module.exports.PlayerModel = mongoose.model('Player', Player);
var VenueModel = module.exports.VenueModel = mongoose.model('Venue', Venue);
var MatchModel = module.exports.MatchModel = mongoose.model('Match', Match);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});