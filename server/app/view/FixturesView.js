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
            city: 'Melbourne, Australia'
            location: [-37.7992, 144.9467]
        },
        {
            username: 'tamatimikaere',
            password: '123',
            name: 'Tamati Mikaere',
            email: 'tamati.mikaere@gmail.com',
            gender: 'M',
            city: 'Wellington, New Zealand'
            location: [-41.2889, 174.7772]
        },
        {
            username: 'anaherahine',
            password: '123',
            name: 'Anahera Hine',
            email: 'anahera.hine@gmail.com',
            gender: 'F',
            city: 'Wellington, New Zealand'
            location: [-41.2889, 174.7772]
        }
    ];

    http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm
    player = new models.Player();
    player.save();

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
        players: [player1.id, player2.id ],
        price: 0, 
        organizer: player1.id
    });
    match.save();


    res.send(200);
};