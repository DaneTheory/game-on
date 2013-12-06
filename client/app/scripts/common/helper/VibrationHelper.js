//
// # Vibration Helper
// Executes HTML5 `vibrate` API
//
// 2013 Pablo De Nadai
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