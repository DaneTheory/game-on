//
// # Sign Out View
//
// 2013 Pablo De Nadai
//

//
// Sign Out
//
exports.signOut = function (req, res) {
    req.logout();
    return res.send(200);
};