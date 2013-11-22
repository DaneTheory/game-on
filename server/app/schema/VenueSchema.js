// 
// ### Venue Schema
// Endpoint: http://localhost:3000/api/1/venue/
// 
exports = module.exports = function(app, mongoose) {

    var VenueSchema = new mongoose.Schema({
        name: { type: String, required: true },
        coordinates: { type: Array }
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });
    VenueSchema.index({ coordinates: '2d' });

    // 
    // Example:
    // http://localhost:3000/api/1/venue/finder/near?latitude=-37.648792&longitude=145.19104&maxDistance=100
    // @maxDistance {number} Distance in Kms
    // 
    VenueSchema.statics.near = function (q, term) {
        var coordinates = [ Number(q.latitude), Number(q.longitude) ];
        var maxDistance = q.maxDistance;

        var query = {
            'coordinates': {
                $near: coordinates,
                $maxDistance: maxDistance / 111.12
            }
        };

        if (term) {
            query.name = new RegExp('^' + term, "i");
        }

        return this.find(query);
    };

    VenueSchema.virtual('type').get(function () {
        return 'venue';
    });

    mongoose.model('Venue', VenueSchema);
};
