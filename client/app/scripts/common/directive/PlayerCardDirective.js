//
//
//

'use strict';

app.directive('playerCard', function () {
 
	return {
		restrict: 'A',
		templateUrl: 'views/player/_PlayerCardView.html',
		replace: true,
		controller: function($scope) {
		},
		link: function (scope, element) {
		}
	};

});