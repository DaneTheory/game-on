//
//
//

'use strict';

app.directive('venueCard', function () {
 
	return {
		restrict: 'A',
		templateUrl: 'views/venue/_VenueCardView.html',
		replace: true,
		controller: function($scope) {
		},
		link: function (scope, element) {
		}
	};

});