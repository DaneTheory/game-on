//
// Sign Out
//
exports.signOut = function (req, res) {
    req.logout();
    return res.send(200);
};