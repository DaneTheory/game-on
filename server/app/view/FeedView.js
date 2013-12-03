var _ = require('lodash');

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

exports.markAllAsRead = function (req, res) {

    var playerId = req.session.passport.user,
        models = req.app.db.models,
        Feed = models.Feed;

    Feed.update({ 'player': playerId }, { $set: { 'meta.readAt': new Date } }, { multi: true }, function (err, numAffected) {
        if (err) return res.send(500, err);
        return res.send(200);
    });

};



