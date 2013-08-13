//
// Sign Out
//
exports.signOut = function (req, res) {
    req.logout();
    res.send(200);
};