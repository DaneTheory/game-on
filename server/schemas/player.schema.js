var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId;

var Player = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: Array }
});
Player.index({ location: '2d' });

// http://localhost:3000/api/v1/player/finder/near?location=-37.648792,145.19104&maxDistance=100
// coordinates = lat, lon
// maxDistance = km
Player.statics.near = function (q, term) {
    var coordinates = q.location.split(',').map(Number);
    var maxDistance = q.maxDistance;
    return this.find({
            'location': {
                $near: coordinates,
                $maxDistance: maxDistance / 111.12
            }
        });
};

var PlayerModel = module.exports.PlayerModel = mongoose.model('Player', Player);
