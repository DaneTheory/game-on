exports.init = function (req, res) {
    delete req.session.username;
    res.send(200);
};