var _ = require('lodash');

//
// Search Near.
// Searches for Games, People and Venues within a range of Km.
// 
exports.searchNear = function (req, res) {

    var models = req.app.db.base.models;

    // TODO: Sanitize `term`.
    var query = {
            latitude: req.query.latitude || 0,
            longitude: req.query.longitude || 0,
            maxDistance: req.query.maxDistance  || 0
        },
        term = req.query.term || null,
        maxResults = 20;

    var outcome = [];

    var findPlayer = function (callback) {
        models.Player.near(query, term).limit(maxResults).exec(function (err, players) {
            if (err) res.send(err);
            outcome.push.apply(outcome, players);
            callback(null, 'done');
        });
    };

    var findMatch = function (callback) {
        models.Match.near(query, term).limit(maxResults).exec(function (err, matches) {
            if (err) res.send(err);
            outcome.push.apply(outcome, matches);
            callback(null, 'done');
        });
    };

    var findVenue = function (callback) {
        models.Venue.near(query, term).limit(maxResults).exec(function (err, venues) {
            if (err) res.send(err);
            outcome.push.apply(outcome, venues);
            callback(null, 'done');
        });
    };

    var distance = function (loc1, loc2) {
        return Math.sqrt(
            Math.pow( loc2.location[1] - loc1.location[1], 2 ) +
            Math.pow( loc2.location[0] - loc1.location[0], 2 )
        );
    };

    var sortByProximity = function (currentLocation, arr) {
        arr.sort(function (a, b) {
            return distance( currentLocation, a ) - distance( currentLocation, b );
        });
    };

    var asyncFinally = function (err, results) {
        if (err) res.send(err);

        var currentLocation = {
            location: [query.latitude, query.longitude]
        };

        sortByProximity(currentLocation, outcome);

        res.send(outcome);
    };

    require('async').parallel([findPlayer, findMatch, findVenue], asyncFinally);
};