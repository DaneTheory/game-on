//
// # Moment Filter
// Converts a timestamp to a human-readable date and time string.
//
// 2013 Pablo De Nadai
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
// ### filter momentRelative (date)
// #### @date {date} The date to convert. Can either be a Date object or an ISO-8601 date string.
// Converts a timestamp to a human-readable string showing the time relative to now.
//
app.filter('momentRelativeNoSuffix', function() {
	return function(date) {
		var thisMoment = moment(date);

		if (date === null || !angular.isDefined(date) || !thisMoment.isValid()) {
			return null;
		}

		return thisMoment.fromNow(true);

	};
});

//
// ### filter momentRelative (date)
// #### @date {date} The date to convert. Can either be a Date object or an ISO-8601 date string.
// Converts a timestamp to a human-readable string showing the time relative to now.
//
app.filter('momentRelativeFormat', function() {
	return function(date, format) {
		var thisMoment = moment(date);

		if (date === null || !angular.isDefined(date) || !thisMoment.isValid()) {
			return null;
		}

		return thisMoment.format(format);

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