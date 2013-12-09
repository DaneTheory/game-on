//
// # Map Directive
// Renders a Google Map widget with the given `zoom` level and `centerCoordinates`.
// Options:
// - @showCenterMarker {boolean} Adds a marker to the center of the map if set to `true`.
// - @markers {array} List of coordinates. Adds a marker for each item in the list.
// - @markerClick {function} Callback function for when a marker is clicked.
// - @isMonoMarker {boolean} Whether user can add a new marker to the map. (and only the lastest stays).
// 
// 2013 Pablo De Nadai
//

'use strict';

app.directive('map', function ($timeout) {

	return {
		restrict: 'E',
		scope: {
			zoom: '=',
			markers: '=',
			centerCoordinates: '=',
			showCenterMarker: '=',
			markerClick: '&',
			isMonoMarker: '='
		},
		link: function (scope, elem, attrs) {
			// Icons (future reference).
			// Red: http://mt.google.com/vt/icon/text=%E2%80%A2&psize=25&font=fonts/arialuni_t.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-b.png&ax=44&ay=48&scale=1
			// Green: http://mt.google.com/vt/icon/text=%E2%80%A2&psize=25&font=fonts/arialuni_t.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=48&scale=1
			
			// Google Maps Style
			google.maps.visualRefresh = true;

			var zoom = scope.$eval(attrs.zoom),
				isMonoMarker = scope.$eval(attrs.isMonoMarker),
				showCenterMarker = scope.$eval(attrs.showCenterMarker);
			
			var markers = [],
				marker,
				centerMarker;

			// Instanciate the map
			var map = new google.maps.Map(elem[0], {
				zoom: zoom || 14,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});

			if (isMonoMarker) {
				var geocoder = new google.maps.Geocoder();

				google.maps.event.addListener(map, "click", function (event) {
					// Remove previous marker.
					if (marker) {
						marker.setMap(null);
						marker = null;
					};

					// Create new marker
					marker = new google.maps.Marker({
						position: event.latLng,
						map: map
					});

					// Get geocode and execute callback function
					geocoder.geocode({'latLng': event.latLng}, function(results, status) {
						return scope.markerClick({
							results: results, 
							coordinates: [
								event.latLng.lat(),
								event.latLng.lng()
							]
						});
					});
				}); 
			}

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

					var marker = new google.maps.Marker({
						position: position,
						map: map
					});

					google.maps.event.addListener(marker, 'click', function() {
						scope.markerClick({ marker: m });
					});

					markers.push(marker);
				});
			});

			scope.$watch('centerCoordinates', function (coordinates) {
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