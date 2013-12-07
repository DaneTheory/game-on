// 
// # Player Schema
// 
// 2013 Pablo De Nadai
//

var crypto = require('crypto'),
    dateHelper = require('./../helper/DateHelper')(),
    tokenMatcherHelper = require('./../helper/TokenMatcherHelper')();

exports = module.exports = function(app, mongoose) {

    var PlayerSchema = new mongoose.Schema({
        email: { type: String },
        password: { type: String, select: false },
        name: { type: String },
        gender: { type: String, upper: true, match: /[MF]/ },
        location: { type: String },
        rate: { type: Number, min: 1, max: 5 },
        gamesPlayed: { type: Number, default: 0 },
        gamesOrganized: { type: Number, default: 0 },
        bio: { type: String, default: '' },
        backgroundImageId: { type: Number, default: 0 },
        profile: {
            id: { type: Number }
            // TODO: Merge profile and player data.
        }
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });

    // Encrypt strings using SHA-2 standard.
    PlayerSchema.statics.encryptPassword = function(password) {
        return crypto.createHmac('sha512', app.get('crypto-key')).update(password).digest('hex');
    };

    PlayerSchema.virtual('type').get(function () {
        return 'player';
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

    mongoose.model('Player', PlayerSchema);
}