var _ = require('lodash'),
	async = require('async');

//
// Search Near.
// Searches for Games, People and Venues within a range of Km.
// 
exports.search = function (req, res) {

	var models = req.app.db.base.models;

	// TODO: Sanitize `query`.
	var query = req.query,
		maxResults = 20,
		outcome = [];

	var userLocation = {
        coordinates: [query.latitude, query.longitude]
    };

	var findMatches = function (callback) {
		models.Match.search(query).limit(maxResults).sort('when').exec(function (err, matches) {
			if (err) res.send(err);

			matches = matches.map(function (match) {
				match = match.toObject();
				match.distance = getDistance(userLocation.coordinates, match.coordinates);
				return match;
			});

			outcome.push.apply(outcome, matches);
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

	var asyncFinally = function (err, results) {
		if (err) res.send(err);
		res.send(outcome);
	};

	async.parallel([findMatches], asyncFinally);
};