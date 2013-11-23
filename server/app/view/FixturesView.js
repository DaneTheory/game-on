var _ = require('lodash');

exports.init = function(req, res){

	var models = req.app.db.base.models,
		encryptPassword = models.Player.encryptPassword;

	// Drop all documents
	models.Player.remove({}, function(err){});
	models.Venue.remove({}, function(err){});
	models.Match.remove({}, function(err){});
	models.Feed.remove({}, function(err){});

	// Player
	var players = [
		{
			username: 'pablodenadai',
			password: encryptPassword('123'),
			name: 'Pablo De Nadai',
			email: 'pablodenadai@gmail.com',
			gender: 'M',
			birthday: new Date('04/16/1988'),
			location: 'Melbourne, Australia',
			coordinates: [-37.7886711, 144.9390435],
			rate: 4
		},
		{
			username: 'tamatimikaere',
			password: encryptPassword('123'),
			name: 'Tamati Mikaere',
			email: 'tamati.mikaere@gmail.com',
			birthday: new Date('02/16/1992'),
			gender: 'M',
			location: 'Wellington, New Zealand',
			coordinates: [-41.2889, 174.7772],
			rate: 2
		},
		{
			username: 'anaherahine',
			password: encryptPassword('123'),
			name: 'Anahera Hine',
			email: 'anahera.hine@gmail.com',
			birthday: new Date('02/16/1992'),
			gender: 'F',
			location: 'Wellington, New Zealand',
			coordinates: [-41.2889, 174.7772],
			rate: 4
		},
		{
			username: 'ibrahimmalik',
			password: encryptPassword('123'),
			name: 'Ibrahim Malik',
			email: 'ibrahim.malik@gmail.com',
			birthday: new Date('02/20/1982'),
			gender: 'M',
			location: 'Cairo, Egypt',
			coordinates: [30.0566, 31.2262],
			rate: 3
		},
		{
			username: 'farahfawziya',
			password: encryptPassword('123'),
			name: 'Farah Fawziya',
			email: 'farah.fawziya@gmail.com',
			birthday: new Date('02/20/1985'),
			gender: 'F',
			location: 'Cairo, Egypt',
			coordinates: [30.0566, 31.2262],
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
			coordinates: [-37.8420, 144.9500],
			location: 'Melbourne, Australia'
		},
		{
			name: 'Maracana',
			coordinates: [-22.9122, -43.2302],
			location: 'Rio De Janeiro, Brazil'
		},
		{
			name: 'Camp Nou',
			coordinates: [41.3809, -2.1228],
			location: 'Barcelona, Spain'
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
			description: 'South-Americans Friendly',
	        venue: vs[0].id,
			players: [
				ps[0].id,
				ps[1].id,
				ps[2].id,
				ps[3].id
			],
			price: 0, 
			organizer: ps[0].id,
			coordinates: vs[0].coordinates,
			gender: 'X',
			maxPlayers: 10
		},
		{
			description: 'Maori Football Club',
	        venue: vs[1].id,
			players: [
				ps[4].id,
				ps[1].id,
				ps[2].id,
				ps[3].id
			],
			price: 5, 
			organizer: ps[4].id,
			coordinates: vs[1].coordinates,
			gender: 'F',
			maxPlayers: 14
		},
		{
			description: 'North Melbourne Neighbours',
	        venue: vs[2].id,
			players: [
				ps[0].id,
				ps[4].id,
				ps[2].id,
				ps[3].id
			],
			price: 2.99, 
			organizer: ps[2].id,
			coordinates: vs[2].coordinates,
			gender: 'M',
			maxPlayers: 22
		}
	];

	var ms = [];
	_.each(matches, function (match) {
		var m = new models.Match(match);
		m.save();
		ms.push(m);
	});

	// Feed
	var feeds = [
		{
			player: ps[0].id,
			type: 'match',
			action: 'joined',
			venue: vs[0].id,
			match: ms[0].id,
			meta: {
				createdBy: ps[1].id,
				createdAt: new Date
			}
		}
	];

	var fs = [];
	_.each(feeds, function (feed) {
		var f = new models.Feed(feed);
		f.save();
		fs.push(f);
	});

	res.send(200, 'Fixtures created with success.');
};