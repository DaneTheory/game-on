exports.init = function (req, res) {
    delete req.session.playerId;
    res.send(200);
};