// 
// ### Feed Schema
// Endpoint: http://localhost:3000/api/1/feed/
// 
exports = module.exports = function(app, mongoose) {

	var FeedSchema = new mongoose.Schema({
		player: { type: mongoose.Schema.ObjectId, ref: 'Player' },
		type: { type: String },

		action: { type: String },
		venue: { type: mongoose.Schema.ObjectId, ref: 'Venue' },
		match: { type: mongoose.Schema.ObjectId, ref: 'Match' },
		
		meta: {
			createdBy: { type: mongoose.Schema.ObjectId, ref: 'Player' },
			createdAt: { type: Date },
			readAt: { type: Date, default: null }
		}
	},
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });
	FeedSchema.index({ _id: 1, player: 1 }, { unique: true });

	FeedSchema.statics.player = function (q, term) {
		return this.find({ 'player': term });
	};
	
	FeedSchema.virtual('isRead').get(function () {
        return this.readAt ? true : false;
    });

	FeedSchema.pre('save', function (next) {
		if (!this.meta.createdAt) this.meta.createdAt = new Date;
		next();
	});

	FeedSchema.post('save', function (doc) {
		app.pushNotification.emitTo(doc.player, doc);
	});

	mongoose.model('Feed', FeedSchema);
}