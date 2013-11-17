// 
// ### Player Schema
// Endpoint: http://localhost:3000/api/1/player/
// 
exports = module.exports = function(app, mongoose) {

    var PlayerSchema = new mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String, select: false },
        name: { type: String },
        email: { type: String },
        gender: { type: String },
        birthday: { type: Date },
        city: { type: String },
        location: { type: Array },
        rate: { type: Number },
        profile: {
            id: { type: Number }
            // TODO: Merge profile and player data.
        }
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });
    PlayerSchema.index({ location: '2d' });

    // 
    // Example:
    // http://localhost:3000/api/1/player/finder/near?latitude=-37.648792&longitude=145.19104&maxDistance=100
    // @maxDistance {number} Distance in Kms
    // 
    PlayerSchema.statics.near = function (q, term) {
        var coordinates = [ Number(q.latitude), Number(q.longitude) ],
            maxDistance = q.maxDistance;

        var query = {
            'location': {
                $near: coordinates,
                $maxDistance: maxDistance / 111.12
            }
        };

        if (term) {
            query.name = new RegExp('^' + term, "i");
        }

        return this.find(query);
    };

    // Encrypt strings using SHA-2 standard.
    PlayerSchema.statics.encryptPassword = function(password) {
        return require('crypto').createHmac('sha512', app.get('crypto-key')).update(password).digest('hex');
    };

    PlayerSchema.virtual('documentType').get(function () {
        return 'player';
    });

    mongoose.model('Player', PlayerSchema);
}