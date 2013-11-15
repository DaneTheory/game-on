//
// # MapDirective.js
// Directive that renders a map with a marker on the given coordinate
//

'use strict';

app.directive('map', function () {

	return {
		restrict: 'E',
		scope: {
			coordinates: '='
		},
		link: function (scope, elem, attrs) {
			scope.$watch('coordinates', function (coordinates) {
				if (!coordinates) {
					return;
				}

				var position = new google.maps.LatLng(coordinates[0], coordinates[1]);

				var mapOptions = {
					zoom: 14,
		    		center: position,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				
				var map = new google.maps.Map(elem[0], mapOptions);

				var marker = new google.maps.Marker({
					position: position,
					map: map
				});
			});
		}
	};

});