//
// # Fallback Src Directive
// Replace the element's `src` attr with a placeholder in case it fails to load the resource.
//
// 2013 Pablo De Nadai
//

'use strict';

app.directive('fallbackSrc', function () {
   
    return function (scope, elem, attr) {
            elem.bind('error', function() {
                angular.element(this).attr("src", attr.fallbackSrc);
            });
        };

});