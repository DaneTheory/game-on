//
// # Moment Directive
// Render a relative date string, with a title showing the absolute date.
//
// 2013 Pablo De Nadai
//

'use strict';

app.directive('moment', function () {

	// 
	// @date {date, string} The date to be transformed.
	// 
	return {
		restrict: 'E',
		scope: {
			date: "="
		},
		template:
			"<span title=\"{{date | momentAbsolute}}\">{{date | momentRelative}}</span>",
		replace: true
	};

});