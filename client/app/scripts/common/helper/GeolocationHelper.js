//
//
//

'use strict';

app.factory('GeolocationHelper', function ($rootScope, $q) {

	var getDistanceFromCoordinates = function (coordinatesFrom, coordinatesTo) {
		var r = 6371; // Radius of the earth in km

		var lat1 = coordinatesFrom[0],
			lon1 = coordinatesFrom[1],
			lat2 = coordinatesTo[0],
			lon2 = coordinatesTo[1];
		
		var dLat = degreesToRadians(lat2 - lat1);  // degreesToRadians below
		var dLon = degreesToRadians(lon2 - lon1); 
	
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.sin(dLon / 2) * Math.sin(dLon / 2) * 
				Math.cos(degreesToRadians(lat1)) * 
				Math.cos(degreesToRadians(lat2));

		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
		
		return r * c; // Distance in km
	};

	var degreesToRadians = function (deg) {
		return deg * (Math.PI / 180);
	};

	var getGeoLocation = function () {
		var deferred = $q.defer();

		navigator.geolocation.getCurrentPosition(function (location) {
        	$rootScope.$apply(function(){
	        	deferred.resolve(location);
	    	});
		});
	    
	    return deferred.promise;
    };

	return {
		getGeoLocation: getGeoLocation,
		getDistanceFromCoordinates: getDistanceFromCoordinates
	}

});