var _ = require('lodash');

exports.init = function(req, res){

	var models = req.app.db.base.models,
		encryptPassword = models.Player.encryptPassword;

	// Drop all documents
	models.Player.remove({}, function(err){});
	models.Venue.remove({}, function(err){});
	models.Match.remove({}, function(err){});

	// Player
	var players = [
		{
			username: 'pablodenadai',
			password: encryptPassword('123'),
			name: 'Pablo De Nadai',
			email: 'pablodenadai@gmail.com',
			gender: 'M',
			birthday: new Date('04/16/1988'),
			city: 'Melbourne, Australia',
			location: [-37.7886711, 144.9390435],
			rate: 4
		},
		{
			username: 'tamatimikaere',
			password: encryptPassword('123'),
			name: 'Tamati Mikaere',
			email: 'tamati.mikaere@gmail.com',
			birthday: new Date('02/16/1992'),
			gender: 'M',
			city: 'Wellington, New Zealand',
			location: [-41.2889, 174.7772],
			rate: 2
		},
		{
			username: 'anaherahine',
			password: encryptPassword('123'),
			name: 'Anahera Hine',
			email: 'anahera.hine@gmail.com',
			birthday: new Date('02/16/1992'),
			gender: 'F',
			city: 'Wellington, New Zealand',
			location: [-41.2889, 174.7772],
			rate: 4
		},
		{
			username: 'ibrahimmalik',
			password: encryptPassword('123'),
			name: 'Ibrahim Malik',
			email: 'ibrahim.malik@gmail.com',
			birthday: new Date('02/20/1982'),
			gender: 'M',
			city: 'Cairo, Egypt',
			location: [30.0566, -31.2262],
			rate: 3
		},
		{
			username: 'farahfawziya',
			password: encryptPassword('123'),
			name: 'Farah Fawziya',
			email: 'farah.fawziya@gmail.com',
			birthday: new Date('02/20/1985'),
			gender: 'F',
			city: 'Cairo, Egypt',
			location: [30.0566, -31.2262],
			rate: 5
		}
	];

	var ps = [];
	_.each(players, function (player) {
		var p = new models.Player(player);
		p.save();
		ps.push(p);
	});

	// Venue
	var venues = [
		{
			name: 'Albert Park',
			location: [-37.8420, 144.9500]
		},
		{
			name: 'Maracana',
			location: [-22.9122, -43.2302]
		},
		{
			name: 'Camp Nou',
			location: [41.3809, -2.1228]
		}
	];

	var vs = [];
	_.each(venues, function (venue) {
		var v = new models.Venue(venue);
		v.save();
		vs.push(v);
	});

	// Match
	var matches = [
		{
			title: 'South-Americans Friendly',
	        venue: vs[0].id,
			players: [
				ps[0].id,
				ps[1].id,
				ps[2].id,
				ps[3].id
			],
			price: 0, 
			organizer: ps[0].id,
			location: vs[0].location
		},
		{
			title: 'Maori Football Club',
	        venue: vs[1].id,
			players: [
				ps[4].id,
				ps[1].id,
				ps[2].id,
				ps[3].id
			],
			price: 5, 
			organizer: ps[4].id,
			location: vs[1].location
		},
		{
			title: 'North Melbourne Neighbours',
	        venue: vs[2].id,
			players: [
				ps[0].id,
				ps[4].id,
				ps[2].id,
				ps[3].id
			],
			price: 2.99, 
			organizer: ps[2].id,
			location: vs[2].location
		}
	];

	var ms = [];
	_.each(matches, function (match) {
		var m = new models.Match(match);
		m.save();
		ms.push(m);
	});

	res.send(200);
};