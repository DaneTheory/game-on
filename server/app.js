var express = require('express'),
    mongoStore = require('connect-mongo')(express),
    http = require('http'),
    path = require('path'),
    _ = require('lodash');

var models = require('./schemas');

var app = express();

// all environments
app.set('mongodb-uri', process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/footballjs94');
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
    secret: 'something',
    maxAge: new Date(Date.now() + 3600000), //1 Hour
    expires: new Date(Date.now() + 3600000), //1 Hour
    store: new mongoStore({ url: app.get('mongodb-uri') })

}));
app.use(express.methodOverride());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:9000");
    res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(function(req, res, next){
    if (_.contains(req.url, '/api/') && !req.session.username) {
        res.send(401, 'You are not authorized to view this page');
    } else {
        next();
    }
});
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.options('*', function(req, res){
    res.send(200); 
});

var mers = require('mers');
app.use('/api/v1', mers({ uri: app.get('mongodb-uri') }).rest());

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});



