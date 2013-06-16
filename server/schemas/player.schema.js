exports = module.exports = function(app, mongoose) {

    var PlayerSchema = new mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        location: { type: Array }
    });
    PlayerSchema.index({ location: '2d' });

    // http://localhost:3000/api/v1/player/finder/near?location=-37.648792,145.19104&maxDistance=100
    // coordinates = lat, lon
    // maxDistance = km
    PlayerSchema.statics.near = function (q, term) {
        var coordinates = q.location.split(',').map(Number);
        var maxDistance = q.maxDistance;
        return this.find({
                'location': {
                    $near: coordinates,
                    $maxDistance: maxDistance / 111.12
                }
            });
    };

    mongoose.model('Player', PlayerSchema);
}