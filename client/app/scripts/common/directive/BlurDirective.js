//
// # Blur Directive
// Directive that executes an expression 
// when the element it is applied to loses focus.
//
// 2013 Pablo De Nadai
//

'use strict';

app.directive('blur', function () {

	return function (scope, elem, attrs) {
		elem.bind('blur', function () {
			scope.$apply(attrs.blur);
		});
	};

});