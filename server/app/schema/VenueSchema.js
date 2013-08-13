// 
// ### Venue Schema
// Endpoint: http://localhost:3000/api/1/venue/
// 
exports = module.exports = function(app, mongoose) {

    var VenueSchema = new mongoose.Schema({
        name: { type: String, required: true },
        location: { type: Array }
    });
    VenueSchema.index({ location: '2d' });

    // 
    // Example:
    // http://localhost:3000/api/1/venue/finder/near?latitude=-37.648792&longitude=145.19104&maxDistance=100
    // @maxDistance {number} Distance in Kms
    // 
    VenueSchema.statics.near = function (q, term) {
        var coordinates = [ Number(q.latitude), Number(q.longitude) ];
        var maxDistance = q.maxDistance;
        return this.find({
                'location': {
                    $near: coordinates,
                    $maxDistance: maxDistance / 111.12
                }
            });
    };

    mongoose.model('Venue', VenueSchema);
};
