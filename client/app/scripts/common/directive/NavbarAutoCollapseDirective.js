//
//
//

'use strict';

app.directive('navbarAutoCollapse', ['$rootScope', function ($rootScope) {
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
}]);