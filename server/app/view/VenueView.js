var _ = require('lodash');

//
// New Venue
// Creates a new venue. 
//
exports.create = function (req, res) {

	var playerId = req.session.passport.user,
		models = req.app.db.models,
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

//
//
//
exports.near = function (req, res) {

	var playerId = req.session.passport.user,
		models = req.app.db.models,
		query = req.query,
		Venue = models.Venue;

	Venue.near(query).exec(function (err, venues) {
		if (err) return res.send(500, err);

		return res.send(200, venues);
	});

};