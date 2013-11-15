// 
// # EnterDirective.js
// Directive that executes an expression when the element it is applied to gets 
// an `enter` keydown event.
//

'use strict';

app.directive('enter', function () {

	var ESCAPE_KEY = 13;

	return function (scope, elem, attrs) {
		elem.bind('keydown', function (event) {
			if (event.keyCode === ESCAPE_KEY) {
				scope.$apply(attrs.enter);
			}
		});
	};

});
