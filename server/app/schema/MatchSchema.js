// http://localhost:3000/api/1/match/

exports = module.exports = function(app, mongoose) {

	var MatchSchema = new mongoose.Schema({
		title: { type: String },
		venue: { type: mongoose.Schema.ObjectId, ref: 'Venue'},
		when: { type: Date, default: Date.now },
		players: [{ type: mongoose.Schema.ObjectId, ref: 'Player'} ],
		price: { type: Number },
		organizer: { type: mongoose.Schema.ObjectId, ref: 'Player'},

		meta: {
			created: { type: Date, default: Date.now },
			modified: { type: Date, default: Date.now }
		}
	});
	
	MatchSchema.statics.organizer = function (q, term) {
		return this.find({ 'organizer': term });
	};
	
	MatchSchema.statics.player = function (q, term) {
		return this.find({ 'players': term });
	};
	
	MatchSchema.statics.venue = function (q, term) {
		return this.find({ 'venue': term });
	};

	mongoose.model('Match', MatchSchema);
}