var passportSocketIo = require('passport.socketio'),
	_ = require('lodash');

exports = module.exports = function(socketIo) {
	return {
		emit: function(playerId, type, message){
			passportSocketIo.filterSocketsByUser(socketIo, function (player) {
				return _.isEqual(player._id, playerId);
			}).forEach(function(s){
				s.emit(type, message);
			});
		}
	}
}