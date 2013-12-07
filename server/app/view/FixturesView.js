//
// # Fixtures View
//
// 2013 Pablo De Nadai
//

var _ = require('lodash');

exports.init = function(req, res){

	var models = req.app.db.models,
		encryptPassword = models.Player.encryptPassword;

	// Drop all documents
	models.Player.remove({}, function(err){});
	models.Venue.remove({}, function(err){});
	models.Game.remove({}, function(err){});
	models.Feed.remove({}, function(err){});

	// Player
	var players = [
		{
			password: encryptPassword('123'),
			name: 'Pablo De Nadai',
			email: 'pablodenadai@gmail.com',
			gender: 'M',
			location: 'Melbourne, Australia',
			rate: 4
		},
		{
			password: encryptPassword('123'),
			name: 'Tamati Mikaere',
			email: 'tamati.mikaere@gmail.com',
			gender: 'M',
			location: 'Wellington, New Zealand',
			rate: 2
		},
		{
			password: encryptPassword('123'),
			name: 'Anahera Hine',
			email: 'anahera.hine@gmail.com',
			gender: 'F',
			location: 'Wellington, New Zealand',
			rate: 4
		},
		{
			password: encryptPassword('123'),
			name: 'Ibrahim Malik',
			email: 'ibrahim.malik@gmail.com',
			gender: 'M',
			location: 'Cairo, Egypt',
			rate: 3
		},
		{
			password: encryptPassword('123'),
			name: 'Farah Fawziya',
			email: 'farah.fawziya@gmail.com',
			gender: 'F',
			location: 'Cairo, Egypt',
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
			coordinates: [-37.844054, 144.968842],
			location: 'Melbourne, Australia',
			address: '49 Convetry Street, South Melbourne',
			phone: '+61 03 9634 3452' 
		},
		{
			name: 'Maracana',
			coordinates: [-22.9122, -43.2302],
			location: 'Rio De Janeiro, Brazil',
			address: 'Rua Professor Eurico Rabelo S/N',
			phone: '+55 21 3256 1712'
		},
		{
			name: 'Camp Nou',
			coordinates: [41.3809, -2.1228],
			location: 'Barcelona, Spain',
			address: '12 Carrer d\'Aristides Maillol',
			phone: '+34 902 18 99 00'
		}
	];

	var vs = [];
	_.each(venues, function (venue) {
		var v = new models.Venue(venue);
		v.save();
		vs.push(v);
	});

	// Game
	var games = [
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
	_.each(games, function (game) {
		var m = new models.Game(game);
		m.save();
		ms.push(m);
	});

	// Feed
	var feeds = [
		{
			player: ps[0].id,
			type: 'game',
			action: 'joined',
			venue: vs[0].id,
			game: ms[0].id,
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