//
// # MapDirective.js
// Directive that renders a map with a marker on the given coordinate
//

'use strict';

app.directive('map', function ($timeout) {

	return {
		restrict: 'E',
		scope: {
			zoom: '=',
			markers: '=',
			coordinates: '=',
			showCenterMarker: '='
		},
		link: function (scope, elem, attrs) {
			var zoom = scope.$eval(attrs.zoom),
				showCenterMarker = scope.$eval(attrs.showCenterMarker);
			
			var markers = [],
				centerMarker;

			var map = new google.maps.Map(elem[0], {
				zoom: zoom || 14,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});

			scope.$watch('markers', function (ms) {
				if (!ms) {
					return;
				}

				// Remove all markers, except the center one `centerMarker`.
				angular.forEach(markers, function(m){
					m.setMap(null);
				});

				angular.forEach(ms, function(m){
					var position = new google.maps.LatLng(m.coordinates[0], m.coordinates[1]);

					markers.push(new google.maps.Marker({
						position: position,
						map: map
					}));
				});
			});

            scope.$watch('coordinates', function (coordinates) {
				if (!coordinates) {
					return;
				}

				var center = new google.maps.LatLng(coordinates[0], coordinates[1]);
				map.setCenter(center);

				// Remove center marker first
				if (centerMarker) {
					centerMarker.setMap(null);
				}

				// Then add it if needed
				if (showCenterMarker) {
					centerMarker = new google.maps.Marker({
						position: center,
						map: map
					});
				}
			});
		}
	};
});