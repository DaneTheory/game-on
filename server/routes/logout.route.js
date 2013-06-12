app.get('/logout', function (req, res) {
    delete req.session.username;
    res.send(200);
});