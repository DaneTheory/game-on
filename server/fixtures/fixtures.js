app.get('/fixtures', function(req, res){
    PlayerModel.remove({}, function(err) { 
        console.log('collection removed') 
    });

    var player = new PlayerModel({
        username: 'johnny',
        password: 'johnny',
        name: 'John Travolta',
        email: 'johntravs@gmail.com',
        location: [-37.7992, 144.9467]
    });
    player.save();

    player = new PlayerModel({
        username: 'ann',
        password: 'ann',
        name: 'Ann Clark',
        email: 'ann@hotmail.com',
        location: [20,20]
    });
    player.save();

    res.send(200);
});

app.get('/pop_venue', function(req, res){
    VenueModel.remove({}, function(err) { 
       console.log('collection removed') 
    });

    var venue = new VenueModel({
        name: 'Albert Park',
        location: [-37.8420, 144.9500]
    });

    venue.save();

    var venue = new VenueModel({
        name: 'Maracana',
        location: [-22.9122, -43.2302]
    });

    venue.save();

    res.send(200);
});

app.get('/pop_match', function(req, res){
    MatchModel.remove({}, function(err) { 
       console.log('collection removed') 
    });

    var match = new MatchModel({
        venue: '51b33b7c0fc56ca397000001',
        players: ['51b07a6819108cf52d000001', '51b07a6819108cf52d000002' ],
        price: 0, 
        organizer: '51b07a6819108cf52d000001'
    });

    match.save();

    res.send(200);
});