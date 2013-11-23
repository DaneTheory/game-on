//
//
//

'use strict';

app.factory('CacheHelper', function ($cacheFactory) {

    var dataCache = $cacheFactory('dataCache', { 
        maxAge: 3600000 // items expire after an hour
    });

	return dataCache;

});