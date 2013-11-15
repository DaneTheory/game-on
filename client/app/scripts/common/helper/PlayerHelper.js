//
//
//

'use strict';

app.factory('PlayerHelper', function (AuthenticationModel) {

	var isMe = function (playerId) {
		try {
			return AuthenticationModel.player.id === playerId;
		} catch (err) {
			return false;
		}
	};

	return {
		isMe: isMe
	}

});