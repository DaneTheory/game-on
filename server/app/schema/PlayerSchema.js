// http://localhost:3000/api/1/player/

exports = module.exports = function(app, mongoose) {

    var PlayerSchema = new mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String },
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
    });
    PlayerSchema.index({ location: '2d' });

    // http://localhost:3000/api/1/player/finder/near?latitude=-37.648792&longitude=145.19104&maxDistance=100
    // maxDistance = km
    PlayerSchema.statics.near = function (q, term) {
        var coordinates = [ Number(q.latitude), Number(q.longitude) ];
        var maxDistance = q.maxDistance;
        return this.find({
                'location': {
                    $near: coordinates,
                    $maxDistance: maxDistance / 111.12
                }
            });
    };

    PlayerSchema.statics.encryptPassword = function(password) {
        return require('crypto').createHmac('sha512', app.get('crypto-key')).update(password).digest('hex');
    };

    mongoose.model('Player', PlayerSchema);
}