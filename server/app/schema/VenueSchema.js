// 
// # Venue Schema
//
// 2013 Pablo De Nadai
//

exports = module.exports = function(app, mongoose) {

    var VenueSchema = new mongoose.Schema({
        name: { type: String, required: true },
        coordinates: { type: Array },
        location: { type: String },
        address: { type: String },

        meta: {
            createdBy: { type: mongoose.Schema.ObjectId, ref: 'Player' },
            createdAt: { type: Date }
        }
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });
    VenueSchema.index({ coordinates: '2d' });

    // 
    // Example:
    // http://localhost:3000/api/1/venue/near?latitude=-37.648792&longitude=145.19104&maxDistance=100
    // @maxDistance {number} Distance in Kms
    // 
    VenueSchema.statics.near = function (q) {
        var query = {
            'coordinates': {
                $near: [ Number(q.latitude), Number(q.longitude) ],
                $maxDistance: q.maxDistance / 111.12
            }
        };

        return this.find(query);
    };

    VenueSchema.virtual('type').get(function () {
        return 'venue';
    });

    mongoose.model('Venue', VenueSchema);
};
