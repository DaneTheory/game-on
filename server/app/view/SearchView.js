var _ = require('lodash');

//
// Search Near.
// Searches for Games, People and Venues within a range of Km.
// 
exports.searchNear = function (req, res) {

    var models = req.app.db.base.models;


    // TODO: Sanitize `query`.
    var query = req.query,
        maxResults = 20;

    var userLocation = {
        coordinates: [query.latitude, query.longitude]
    };

    var outcome = [];

    var findPlayer = function (callback) {
        models.Player.near(query).limit(maxResults).exec(function (err, players) {
            if (err) res.send(err);

            // Fixes immutable results.
            // DRY
            players = players.map(function (player) {
                player = player.toObject();
                player.distance = getDistance(userLocation.coordinates, player.coordinates);
                return player;
            });

            outcome.push.apply(outcome, players);
            callback(null, 'done');
        });
    };

    var findMatch = function (callback) {
        models.Match.near(query).limit(maxResults).exec(function (err, matches) {
            if (err) res.send(err);

            // Fixes immutable results.
            // DRY
            matches = matches.map(function (match) {
                match = match.toObject();
                match.distance = getDistance(userLocation.coordinates, match.coordinates);
                return match;
            });

            outcome.push.apply(outcome, matches);
            callback(null, 'done');
        });
    };

    var findVenue = function (callback) {
        models.Venue.near(query).limit(maxResults).exec(function (err, venues) {
            if (err) res.send(err);

            // Fixes immutable results.
            // DRY
            venues = venues.map(function (venue) {
                venue = venue.toObject();
                venue.distance = getDistance(userLocation.coordinates, venue.coordinates);
                return venue;
            });


            outcome.push.apply(outcome, venues);
            callback(null, 'done');
        });
    };

    // Move it to a helper.
    var getDistance = function (coordinatesFrom, coordinatesTo) {
        var r = 6371; // Radius of the earth in km

        var lat1 = coordinatesFrom[0],
            lon1 = coordinatesFrom[1],
            lat2 = coordinatesTo[0],
            lon2 = coordinatesTo[1];
        
        var dLat = degreesToRadians(lat2 - lat1);  // degreesToRadians below
        var dLon = degreesToRadians(lon2 - lon1); 
    
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * 
                Math.cos(degreesToRadians(lat1)) * 
                Math.cos(degreesToRadians(lat2));

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 

        var distance = r * c; // Distance in km
        
        return distance; 
    };

    // Move it to a helper.
    var degreesToRadians = function (deg) {
        return deg * (Math.PI / 180);
    };

    // Move it to a helper.
    var sortByProximity = function (baseLocation, arr) {
        arr.sort(function (a, b) {
            return getDistance(baseLocation.coordinates, a.coordinates) -
                getDistance(baseLocation.coordinates, b.coordinates);
        });
    };

    var asyncFinally = function (err, results) {
        if (err) res.send(err);

        sortByProximity(userLocation, outcome);

        res.send(outcome);
    };

    require('async').parallel([findPlayer, findVenue, findMatch], asyncFinally);
};