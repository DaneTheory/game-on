//
// # FallbackSrcDirective.js
// Replace the element src attr with a placeholder in case it fails to load the resource.
//

'use strict';

app.directive('fallbackSrc', function () {
   
    return function (scope, elem, attr) {
            elem.bind('error', function() {
                angular.element(this).attr("src", attr.fallbackSrc);
            });
        };

});