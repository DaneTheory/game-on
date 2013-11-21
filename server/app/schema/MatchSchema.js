// 
// ### Match Schema
// Endpoint: http://localhost:3000/api/1/match/
// 
exports = module.exports = function(app, mongoose) {

	var MatchSchema = new mongoose.Schema({
		description: { type: String },
		venue: { type: mongoose.Schema.ObjectId, ref: 'Venue'},
		location: { type: Array },
		players: [{ type: mongoose.Schema.ObjectId, ref: 'Player' }],
		organizer: { type: mongoose.Schema.ObjectId, ref: 'Player'},
		when: { type: Date, default: Date.now },
		price: { type: Number },
		maxAttendees: { type: Number, default: 0 },
		gender: { type: String, upper: true, match: /[MFX]/ },
		
		meta: {
			created: { type: Date, default: Date.now },
			modified: { type: Date, default: Date.now }
		}
	},
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });
	MatchSchema.index({ _id: 1, organizer: 1 }, { unique: true });
    MatchSchema.index({ location: '2d' });

	// 
    // Example:
    // http://localhost:3000/api/1/match/finder/near?latitude=-37.648792&longitude=145.19104&maxDistance=100
    // @maxDistance {number} Distance in Kms
    // 
    MatchSchema.statics.near = function (q, term) {
        var coordinates = [ Number(q.latitude), Number(q.longitude) ],
            maxDistance = q.maxDistance;

        var query = {
            'location': {
                $near: coordinates,
                $maxDistance: maxDistance / 111.12
            }
        };

        if (term) {
            query.title = new RegExp('^' + term, "i");
        }

       return this.find(query);
    };
	
	MatchSchema.statics.organizer = function (q, term) {
		return this.find({ 'organizer': term });
	};
	
	MatchSchema.statics.player = function (q, term) {
		return this.find({ 'players': term });
	};
	
	MatchSchema.statics.venue = function (q, term) {
		return this.find({ 'venue': term });
	};

	MatchSchema.virtual('type').get(function () {
        return 'match';
    });

	mongoose.model('Match', MatchSchema);
}