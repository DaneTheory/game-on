exports.init = function(req, res){

    var models = req.app.db.base.models;

    // Drop all
    models.Player.remove({}, function(err){});
    models.Venue.remove({}, function(err){});
    models.Match.remove({}, function(err){});

    /** 
     * Player
     */
    var player1 = new models.Player({
        username: 'johnny',
        password: 'johnny',
        name: 'John Travolta',
        email: 'johntravs@gmail.com',
        location: [-37.7992, 144.9467]
    });
    player1.save();

    var player2 = new models.Player({
        username: 'ann',
        password: 'ann',
        name: 'Ann Clark',
        email: 'ann@hotmail.com',
        location: [20,20]
    });
    player2.save();

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