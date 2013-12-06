//
// # Navbar Auto Collapse
// Directive for Twitter Bootstrap 3
// Collapses the `navbar` whenever the route has changed or been updated.
//
// 2013 Pablo De Nadai
//

'use strict';

app.directive('navbarAutoCollapse', function ($rootScope) {
    return {
        restrict: 'C',
        link: function (scope, element) {

            scope.collapse = function () {
                if (!element.hasClass('collapse')) {
                    element.collapse('hide');
                }
            };

            // Watch for route change.
            $rootScope.$on('$routeChangeSuccess', scope.collapse);

            // Watch for search to change - if `reloadOnSearch` is set to false.
            $rootScope.$on('$routeUpdate', scope.collapse);
        }
    };
});