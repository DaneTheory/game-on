exports.init = function (req, res) {

    req.app.db.base.models.Player.findOne({ 
        username: req.body.username, 
        password: req.body.password
    }, 
    function (err, doc){
        if (doc) {
            req.session.username = req.body.username;
            res.send(200, {
                username: req.body.username
            });
        } else {
            res.send(401, 'Bad user/pass');
        }
    });
};