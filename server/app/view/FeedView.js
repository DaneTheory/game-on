//
// # Feed View
//
// 2013 Pablo De Nadai
//

var _ = require('lodash');

exports.getFeeds = function (req, res) {

    var playerId = req.session.passport.user,
        models = req.app.db.models,
        Feed = models.Feed;

    Feed.find({ 'player': playerId }).sort('-meta.createdAt').limit(10).populate(['game', 'meta.createdBy']).exec(function (err, feeds) {
        if (err) return res.send(500, err);
        return res.send(200, feeds);
    });

};

//
//
// 
exports.markAsRead = function (req, res) {

    var feedId = req.route.params.feedId,
        playerId = req.session.passport.user,
        models = req.app.db.models,
        Feed = models.Feed;

    Feed.findOneAndUpdate({ '_id': feedId, 'player': playerId }, { 'meta.readAt': new Date }, function (err, doc) {
        if (err) return res.send(500, err);
        return res.send(200);
    });

};

//
//
//
exports.markAllAsRead = function (req, res) {

    var playerId = req.session.passport.user,
        models = req.app.db.models,
        Feed = models.Feed;

    Feed.update({ 'player': playerId }, { $set: { 'meta.readAt': new Date } }, { multi: true }, function (err, numAffected) {
        if (err) return res.send(500, err);
        return res.send(200);
    });

};