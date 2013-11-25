var crypto = require('crypto'),
    dateHelper = require('./../helper/DateHelper')(),
    tokenMatcherHelper = require('./../helper/TokenMatcherHelper')();
        
// 
// ### Player Schema
// Endpoint: http://localhost:3000/api/1/player/
// 
exports = module.exports = function(app, mongoose) {

    //
    //
    //
    function addAtNotation (string) {
        return '@' + string;
    };

    var PlayerSchema = new mongoose.Schema({
        username: { type: String, required: true, get: addAtNotation },
        password: { type: String, select: false },
        name: { type: String },
        email: { type: String },
        gender: { type: String, upper: true, match: /[MF]/ },
        birthday: { type: Date },
        location: { type: String },
        coordinates: { type: Array },
        rate: { type: Number, min: 1, max: 5 },
        matchesPlayed: { type: Number, default: 0 },
        matchesOrganized: { type: Number, default: 0 },
        profile: {
            id: { type: Number }
            // TODO: Merge profile and player data.
        }
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });
    PlayerSchema.index({ coordinates: '2d' });

    // 
    // Example:
    // http://localhost:3000/api/1/player/finder/near?latitude=-37.648792&longitude=145.19104&maxDistance=100
    // @maxDistance {number} Distance in Kms
    // 
    PlayerSchema.statics.near = function (q) {
        var query = {
            'coordinates': {
                $near: [ Number(q.latitude), Number(q.longitude) ],
                $maxDistance: q.maxDistance / 111.12
            }            
        };

        if (q.term) {
            query.name = new RegExp('^' + q.term, "i");
        }

        return this.find(query);
    };

    // Encrypt strings using SHA-2 standard.
    PlayerSchema.statics.encryptPassword = function(password) {
        return crypto.createHmac('sha512', app.get('crypto-key')).update(password).digest('hex');
    };

    PlayerSchema.virtual('type').get(function () {
        return 'player';
    });

    PlayerSchema.virtual('username').get(function () {
        return this.username;
    });

    PlayerSchema.virtual('rateArray').get(function () {
        var rate = this.rate,
            i = 0,
            max = 5,
            array = [];

        while (i < max) {
            if (rate > 0) {
                array.push(1);
            } else {
                array.push(0);
            }

            rate--;
            i++;
        }

        return array;
    });

    PlayerSchema.virtual('imageUrl').get(function () {
        var gravatar = 'http://www.gravatar.com/avatar/{0}?s=200&d=mm',
            email = this.email,
            hash = email ? crypto.createHash('md5').update(email.toLowerCase()).digest('hex') : '';

        return tokenMatcherHelper.replaceNumberedTokens(gravatar, [hash]);
    });

    PlayerSchema.virtual('age').get(function () {
        return dateHelper.getAgeFromBirthday(this.birthday);
    });

    // PlayerSchema.virtual('distance').get(function() {
    //     return 1;
    // });

    mongoose.model('Player', PlayerSchema);
}