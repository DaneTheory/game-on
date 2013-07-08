'use strict';

app.directive('placeholderjs', function () {
	return function (scope, elem, attrs) {
		Holder.run();
	};
});