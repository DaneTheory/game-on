//
// # Focus Directive
// Directive that places focus on the element it is applied 
// to when the expression it binds to evaluates to true
//
// 2013 Pablo De Nadai
//

'use strict';

app.directive('focus', function ($timeout) {

	return function (scope, elem, attrs) {
		scope.$watch(attrs.focus, function (newVal) {
			if (newVal) {
				$timeout(function () {
					elem[0].focus();
				}, 0, false);
			}
		});
	};

});