var _ = require('lodash');

exports.init = function(req, res){

	var models = req.app.db.base.models;

	// Drop all
	models.Player.remove({}, function(err){});
	models.Venue.remove({}, function(err){});
	models.Match.remove({}, function(err){});

	/** 
	 * Player
	 */
	var players = [
		{
			username: 'pablodenadai',
			password: '123',
			name: 'Pablo De Nadai',
			email: 'pablodenadai@gmail.com',
			gender: 'M',
			birthday: new Date('04/16/1988'),
			city: 'Melbourne, Australia',
			location: [-37.7992, 144.9467]
		},
		{
			username: 'tamatimikaere',
			password: '123',
			name: 'Tamati Mikaere',
			email: 'tamati.mikaere@gmail.com',
			birthday: new Date('02/16/1992'),
			gender: 'M',
			city: 'Wellington, New Zealand',
			location: [-41.2889, 174.7772]
		},
		{
			username: 'anaherahine',
			password: '123',
			name: 'Anahera Hine',
			email: 'anahera.hine@gmail.com',
			birthday: new Date('02/16/1992'),
			gender: 'F',
			city: 'Wellington, New Zealand',
			location: [-41.2889, 174.7772]
		},
		{
			name: 'Ibrahim Malik',
			password: '123',
			username: '@ibrahimmalik',
			email: 'ibrahim.malik@gmail.com',
			birthday: new Date('02/20/1982'),
			gender: 'M',
			city: 'Cairo, Egypt',
			location: [30.0566, -31.2262]
		},
		{
			name: 'Farah Fawziya',
			password: '123',
			username: '@farahfawziya',
			email: 'farah.fawziya@gmail.com',
			birthday: new Date('02/20/1985'),
			gender: 'F',
			city: 'Cairo, Egypt',
			location: [30.0566, -31.2262]
		}
	];

	var ps = [];

	_.each(players, function (player) {
		var p = new models.Player(player);
		p.save();

		ps.push(p);
	});
	http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm

	/** 
	 * Venue
	 */
	var venue1 = new models.Venue({
		name: 'Albert Park',
		location: [-37.8420, 144.9500]
	});
	venue1.save();

	var venue2 = new models.Venue({
		name: 'Maracana',
		location: [-22.9122, -43.2302]
	});
	venue2.save();

	/** 
	 * Match
	 */
	var match = new models.Match({
		venue: venue1.id,
		players: [
			ps[0].id,
			ps[1].id,
			ps[2].id,
			ps[3].id
		],
		price: 0, 
		organizer: ps[0].id
	});
	match.save();


	res.send(200);
};