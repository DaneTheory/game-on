'use strict';

app.factory('PushNotificationHelper', function (ServerUrl) {

	var socket = io.connect(ServerUrl);
	
	return {
		socket: socket
	}

});