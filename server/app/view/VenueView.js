var _ = require('lodash');

//
// New Venue
// Creates a new venue. 
//
exports.create = function (req, res) {

	var playerId = req.session.passport.user,
		models = req.app.db.base.models,
		Venue = models.Venue;

	var venue = new Venue();

	// TODO: Validate data.
	venue.name = req.body.name;
	venue.coordinates = req.body.coordinates;
	venue.location = req.body.location;
	venue.address = req.body.address;

	venue.meta.createdAt = new Date;
	venue.meta.createdBy = playerId;

	venue.save(function(err, doc){
		if (err) return res.send(500, err);

		// Created
		return res.send(201);
	});

};

