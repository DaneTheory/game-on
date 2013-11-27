//
//
//

'use strict';

app.factory('VibrationHelper', function () {

	return {
		vibrate: function () {
			if (window.navigator.vibrate) {
				window.navigator.vibrate(200);
			}
		}
	};

});