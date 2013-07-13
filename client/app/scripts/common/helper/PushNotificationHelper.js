'use strict';

app.factory('PushNotificationHelper', function (PUSH_NOTIFICATION_URL) {

	var socket = io.connect(PUSH_NOTIFICATION_URL);
	
	return {
		socket: socket
	}

});