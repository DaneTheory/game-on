// 
// ### Game Schema
// Endpoint: http://localhost:3000/api/1/game/
// 
exports = module.exports = function(app, mongoose) {

	var GameSchema = new mongoose.Schema({
		description: { type: String },
		venue: { type: mongoose.Schema.ObjectId, ref: 'Venue'},
		coordinates: { type: Array },
		players: [{ type: mongoose.Schema.ObjectId, ref: 'Player' }],
		organizer: { type: mongoose.Schema.ObjectId, ref: 'Player'},
		when: { type: Date, default: Date.now },
		price: { type: Number },
		maxPlayers: { type: Number, default: 0 },
		gender: { type: String, upper: true, match: /[MFX]/ },
		
		meta: {
			createdAt: { type: Date, default: Date.now },
			modifiedAt: { type: Date, default: Date.now }
		}
	},
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });
	GameSchema.index({ _id: 1, organizer: 1 }, { unique: true });
    GameSchema.index({ coordinates: '2d' });

	// 
    // Example:
    // http://localhost:3000/api/1/game/near?latitude=-37.648792&longitude=145.19104&maxDistance=100
    // @maxDistance {number} Distance in Kms
    // 
    GameSchema.statics.search = function (q) {
        var query = {
            'coordinates': {
                $near: [ Number(q.latitude), Number(q.longitude) ],
                $maxDistance: q.maxDistance / 111.12
            },
            'when': {
            	'$gte': new Date
           	}
        };

        if (q.term) {
            query.description = new RegExp('^' + q.term, "i");
        }

       return this.find(query).populate(['venue', 'organizer', 'players']);
    };
	
	GameSchema.statics.organizer = function (q, term) {
		return this.find({ 'organizer': term });
	};
	
	GameSchema.statics.player = function (q, term) {
		return this.find({ 'players': term });
	};
	
	GameSchema.statics.venue = function (q, term) {
		return this.find({ 'venue': term });
	};

	GameSchema.virtual('type').get(function () {
        return 'game';
    });

	mongoose.model('Game', GameSchema);
}