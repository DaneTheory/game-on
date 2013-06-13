var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId;

var Venue = new Schema({
    name: { type: String, required: true },
    location: { type: Array }
});
Venue.index({ location: '2d' });

// http://localhost:3000/api/v1/venue/finder/near?location=-37.648792,145.19104&maxDistance=100
// coordinates = lat, lon
// maxDistance = km
Venue.statics.near = function (q, term) {
    var coordinates = q.location.split(',').map(Number);
    var maxDistance = q.maxDistance;
    return this.find({
            'location': {
                $near: coordinates,
                $maxDistance: maxDistance / 111.12
            }
        });
};

module.exports = mongoose.model('Venue', Venue);