//
//
//

'use strict';

app.factory('GeolocationHelper', function ($rootScope, $q, CacheHelper) {

	var getGeoLocation = function () {
		var deferred = $q.defer();

		if (CacheHelper.get('geolocation')) {
            deferred.resolve(CacheHelper.get('geolocation'));
        } else {
        	navigator.geolocation.getCurrentPosition(function (location) {
	        	$rootScope.$apply(function(){
		        	deferred.resolve(CacheHelper.put('geolocation', location));
		    	});
			});	
        }
	    
	    return deferred.promise;
    };

	return {
		getGeoLocation: getGeoLocation
	}

});