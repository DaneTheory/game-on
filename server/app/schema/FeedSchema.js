// 
// # Feed Schema
//
// 2013 Pablo De Nadai
// 

exports = module.exports = function(app, mongoose) {

	var FeedSchema = new mongoose.Schema({
		player: { type: mongoose.Schema.ObjectId, ref: 'Player' },
		type: { type: String },

		action: { type: String },
		venue: { type: mongoose.Schema.ObjectId, ref: 'Venue' },
		game: { type: mongoose.Schema.ObjectId, ref: 'Game' },
		
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
		return this.find({ 'player': term }).sort({ 'meta.createdAt': -1 });
	};

	FeedSchema.virtual('id').get(function () {
		return this._id;
	});

	FeedSchema.pre('save', function (next) {
		if (!this.meta.createdAt) this.meta.createdAt = new Date;
		next();
	});

	FeedSchema.post('save', function (doc) {
		app.pushNotification.emitTo(doc.player, 'feed', null);
	});

	mongoose.model('Feed', FeedSchema);
}