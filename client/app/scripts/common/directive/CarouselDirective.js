//
// # Carousel Directive
// Implements the carousel controls (slide to left/right)
// And sets the active slide index to the given `model` attribute.
//
// 2013 Pablo De Nadai 
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
        	// Listens to the controls click
        	//
        	element.find('.carousel-control').on('click', function (e) {
        		var slideDirection = angular.element(e.currentTarget).data('slide');

                //
                // Executes the slide transition either with `prev` or `next` param.
                //
        		element.carousel(slideDirection);
        	});

            //
            // Listens to the end of the transition.
            //
        	element.on('slid.bs.carousel', function () {
        		var data = angular.element(this).data('bs.carousel'),
        			index = data.getActiveIndex();

                //
                // Sets the new index to the model.
                //
				scope.model = index;
				scope.$apply();
			});

        }
    };
});