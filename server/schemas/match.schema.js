var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId;

var Match = new Schema({
    venue: { type: Schema.ObjectId, ref: 'Venue'},
    players: [{ type: ObjectId, ref: 'Player'} ],
    when: { type: Date, default: Date.now },
    price: { type: Number }, 
    organizer: { type: ObjectId, ref: 'Player'},

    meta: {
        created: { type: Date, default: Date.now },
        modified: { type: Date, default: Date.now }
    }
});
Match.statics.organizer = function (q, term) {
    return this.find({ 'organizer': term });
};
Match.statics.player = function (q, term) {
    return this.find({ 'players': term });
};
Match.statics.venue = function (q, term) {
    return this.find({ 'venue': term });
};

var MatchModel = module.exports.MatchModel = mongoose.model('Match', Match);