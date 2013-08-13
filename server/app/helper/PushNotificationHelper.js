var passportSocketIo = require('passport.socketio'),
	_ = require('lodash');

exports = module.exports = function(socketIo) {
	return {

		//
		// ### function emitTo (playerId, notification)
		// #### @playerId {number} Recipient (`Player`) ID.
		// #### @notification {object} Object with `type` and `meta` properties.
		// ##### @type {string} Notification type.
		// ##### @meta {object} Notificatoin data.
		// 
		emitTo: function(playerId, notification){
			passportSocketIo.filterSocketsByUser(socketIo, function (player) {
				return _.isEqual(player._id, playerId);
			}).forEach(function(s){
				s.emit(notification.type, notification.meta);
			});
		}

	}
}