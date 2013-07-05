exports = module.exports = function(app, mongoose) {

    var PlayerSchema = new mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        location: { type: Array }
    });
    PlayerSchema.index({ location: '2d' });

    // http://localhost:3000/api/v1/player/finder/near?latitude=-37.648792&longitude=145.19104&maxDistance=100
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

    mongoose.model('Player', PlayerSchema);
}