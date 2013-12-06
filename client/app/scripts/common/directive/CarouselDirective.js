//
//
//

'use strict';

app.directive('carousel', function () {
    return {
    	scope: {
    		model: '='
    	},
        restrict: 'A',
        link: function (scope, element, attrs) {

        	//
        	//
        	//
        	element.find('.carousel-control').on('click', function (e) {
        		var slideDirection = angular.element(e.currentTarget).data('slide');
        		element.carousel(slideDirection);
        	});

        	element.on('slid.bs.carousel', function () {
        		var data = angular.element(this).data('bs.carousel'),
        			index = data.getActiveIndex();

				scope.model = index;
				scope.$apply();
			});

        }
    };
});