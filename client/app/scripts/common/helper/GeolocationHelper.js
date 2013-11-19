//
//
//

'use strict';

app.factory('GeolocationHelper', function ($rootScope, $q) {

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
		getGeoLocation: getGeoLocation
	}

});