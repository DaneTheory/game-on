var models = require('./../schemas');

function dropCollections(models) {
    
    models.PlayerModel.remove({}, function(err) { 
        console.log('Player, collection removed') 
    });

    models.VenueModel.remove({}, function(err) { 
       console.log('Venue, collection removed') 
    });

    models.MatchModel.remove({}, function(err) { 
       console.log('Match, collection removed') 
    });

};

function createFixtures(app) {

    app.get('/create_fixtures', function(req, res){

        // Drop all
        dropCollections(models);

        /** 
         * Player
         */
        var player1 = new models.PlayerModel({
            username: 'johnny',
            password: 'johnny',
            name: 'John Travolta',
            email: 'johntravs@gmail.com',
            location: [-37.7992, 144.9467]
        });
        player1.save();

        var player2 = new models.PlayerModel({
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
        var venue1 = new models.VenueModel({
            name: 'Albert Park',
            location: [-37.8420, 144.9500]
        });
        venue1.save();

        var venue2 = new models.VenueModel({
            name: 'Maracana',
            location: [-22.9122, -43.2302]
        });
        venue2.save();

        /** 
         * Match
         */
        var match = new models.MatchModel({
            venue: venue1.id,
            players: [player1.id, player2.id ],
            price: 0, 
            organizer: player1.id
        });
        match.save();


        res.send(200);
    });
};

exports = module.exports = createFixtures;