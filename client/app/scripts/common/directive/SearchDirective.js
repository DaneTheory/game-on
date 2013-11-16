//
//
//

'use strict';

app.directive('search', function () {
 
	return {
		restrict: 'E',
		scope: {
			
		},
		template:
			"<div>" +
				"<div class='form-group'>" +
					"<input type='text' class='search-query form-control' placeholder='Search' ng-model='term' ng-show='isSearchOpen' focus='isSearchOpen' escape='openSearch()' blur='closeSearch()' enter='doSearch()'/>" +
				"</div>" +
						
				"<button class='btn btn-default' ng-show='!isSearchOpen' ng-click='openSearch()'><i class='fa fa-search fa-lg'></i></button>" +
			"</div>",
		replace: true,
		controller: function($scope, $location) {
			$scope.location = $location;
		},
		link: function (scope, element) {
			scope.term = '';
			scope.isSearchOpen = false;

			scope.openSearch = function () {
				scope.isSearchOpen = true;
			};

			scope.closeSearch = function () {
				scope.term = '';
				scope.isSearchOpen = false;
			};

			scope.doSearch = function () {
				scope.location.path('/search/near').search({ term: scope.term });
			};

			element.on('$destroy', function() {
				scope.closeSearch();
			});
		}
	};

});