//
//
//

'use strict';

app.directive('datetimePicker', function () {

	return {
		link: function(scope, elem, attrs) {
			elem.datetimepicker({
				icons: {
					time: "fa fa-clock-o",
					date: "fa fa-calendar",
					up: "fa fa-arrow-up",
					down: "fa fa-arrow-down"
				}
			});
		}
	};

});