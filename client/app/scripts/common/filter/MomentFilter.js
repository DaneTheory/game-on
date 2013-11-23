//
// # MomentFilter.js  
// Converts a timestamp to a human-readable date and time string.
//

'use strict';

//
// ### filter momentRelative (date)
// #### @date {date} The date to convert. Can either be a Date object or an ISO-8601 date string.
// Converts a timestamp to a human-readable string showing the time relative to now.
//
app.filter('momentRelative', function() {
	return function(date) {
		var thisMoment = moment(date);

		if (date === null || !angular.isDefined(date) || !thisMoment.isValid()) {
			return null;
		}

		return thisMoment.fromNow();

	};
});

//
// ### filter momentAbsolute (date)
// #### @date {date} The date to convert. Can either be a Date object or an ISO-8601 date string.
// Converts a timestamp to a human-readable date and time string.
//
app.filter('momentAbsolute', function() {
	return function(date) {
		var thisMoment = moment(date);

		if (date === null || !angular.isDefined(date) || !thisMoment.isValid()) {
			return null;
		}

		return thisMoment.format('lll');

	};
});