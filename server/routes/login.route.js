app.post('/login', function (req, res) {
    PlayerModel.findOne({ 
        username: req.body.username, 
        password: req.body.password
    }, 
    function (err, doc){
        if (doc) {
            req.session.username = req.body.username;
            res.send(200);
        } else {
            res.send(401, 'Bad user/pass');
        }
    });
});