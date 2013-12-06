//
//
//

'use strict';

app.directive('carousel', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {

        	element.find('.carousel-control').on('click', function (e) {
        		var slideDirection = angular.element(e.currentTarget).data('slide');
        		element.carousel(slideDirection);
        		element.carousel('pause');
        	});

        }
    };
});