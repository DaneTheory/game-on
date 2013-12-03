var _ = require('lodash');

exports.init = function(req, res){

	var models = req.app.db.models,
		encryptPassword = models.Player.encryptPassword;

	// Drop all documents
	models.Player.remove({}, function(err){});
	models.Venue.remove({}, function(err){});
	models.Match.remove({}, function(err){});
	models.Feed.remove({}, function(err){});

	// Player
	var players = [
		{
			password: encryptPassword('123'),
			name: 'Pablo De Nadai',
			email: 'pablodenadai@gmail.com',
			gender: 'M',
			birthday: new Date('04/16/1988'),
			location: 'Melbourne, Australia',
			rate: 4
		},
		{
			password: encryptPassword('123'),
			name: 'Tamati Mikaere',
			email: 'tamati.mikaere@gmail.com',
			birthday: new Date('02/16/1992'),
			gender: 'M',
			location: 'Wellington, New Zealand',
			rate: 2
		},
		{
			password: encryptPassword('123'),
			name: 'Anahera Hine',
			email: 'anahera.hine@gmail.com',
			birthday: new Date('02/16/1992'),
			gender: 'F',
			location: 'Wellington, New Zealand',
			rate: 4
		},
		{
			password: encryptPassword('123'),
			name: 'Ibrahim Malik',
			email: 'ibrahim.malik@gmail.com',
			birthday: new Date('02/20/1982'),
			gender: 'M',
			location: 'Cairo, Egypt',
			rate: 3
		},
		{
			password: encryptPassword('123'),
			name: 'Farah Fawziya',
			email: 'farah.fawziya@gmail.com',
			birthday: new Date('02/20/1985'),
			gender: 'F',
			location: 'Cairo, Egypt',
			rate: 5
		},
		{
			password: encryptPassword('123'),
			name: 'Merrill Hatfield',
			email: 'Praesent.interdum@lectusquismassa.co.uk',
			birthday: new Date('04/16/1995'),
			gender: 'M',
			location: 'Seattle',
			rate: 3
		},
		{
			password: encryptPassword('123'),
			name: 'Declan Stuart',
			email: 'nisi@dignissimMaecenas.edu',
			birthday: new Date('02/21/1986'),
			gender: 'M',
			location: 'Notre-Dame-du-Nord',
			rate: 3
		},
		{
			password: encryptPassword('123'),
			name: 'Fritz Guerra',
			email: 'nec.cursus@Fuscemollis.edu',
			birthday: new Date('10/18/1998'),
			gender: 'M',
			location: 'Pero',
			rate: 2
		},
		{
			password: encryptPassword('123'),
			name: 'Fitzgerald Downs',
			email: 'arcu@pretiumaliquetmetus.net',
			birthday: new Date('04/28/1983'),
			gender: 'M',
			location: 'Saint Eugine-de-Ladrire',
			rate: 3
		},
		{
			password: encryptPassword('123'),
			name: 'Dale Houston',
			email: 'ornare.egestas.ligula@loremeumetus.ca',
			birthday: new Date('01/18/1994'),
			gender: 'M',
			location: 'Kessel',
			rate: 4
		},
		{
			password: encryptPassword('123'),
			name: 'Tyler Salas',
			email: 'Sed.malesuada.augue@aliquet.co.uk',
			birthday: new Date('08/25/1998'),
			gender: 'M',
			location: 'Carleton',
			rate: 2
		},
		{
			password: encryptPassword('123'),
			name: 'Baxter Harrington',
			email: 'Nunc.quis.arcu@ipsumdolorsit.co.uk',
			birthday: new Date('05/21/1987'),
			gender: 'M',
			location: 'Alva',
			rate: 1
		},
		{
			password: encryptPassword('123'),
			name: 'Kamal Alston',
			email: 'purus.sapien@erat.co.uk',
			birthday: new Date('01/26/1996'),
			gender: 'M',
			location: 'Lauregno',
			rate: 4
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