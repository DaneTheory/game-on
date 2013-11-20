//
//
//

'use strict';

app.directive('matchCard', function () {
 
	return {
		restrict: 'A',
		templateUrl: 'views/match/_MatchCardView.html',
		replace: true,
		controller: function($scope) {
		},
		link: function (scope, element) {
		}
	};

});