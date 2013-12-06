//
// # Cache Helper
// Manages the app cache.
// Extends the Angular native `cacheFactory`.
//
// 2013 Pablo De Nadai
//

'use strict';

app.factory('CacheHelper', function ($cacheFactory) {

    var dataCache = $cacheFactory('dataCache', { 
        maxAge: 3600000 // Items expire after an hour
    });

	return dataCache;

});