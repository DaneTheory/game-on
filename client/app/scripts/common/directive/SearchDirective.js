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
			'<form class="navbar-form navbar-left" role="search">' +
				'<div class="form-group">' +
					'<input type="text" class="search-query form-control" placeholder="Search for games or players" ng-model="term" ng-show="isSearchOpen" focus="isSearchOpen" escape="openSearch()" blur="closeSearch()" enter="search(term)"/>' +
					'<button class="btn btn-default" ng-show="!isSearchOpen" ng-click="openSearch()"><i class="fa fa-search fa-lg"></i> Search</button>' +
				'</div>' +
			'</form>',
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
				scope.isSearchOpen = false;
			};

			scope.search = function (term) {
				var query = { 'term': term };
				if (!term) query = '';
				scope.location.path('/search').search(query);
			};

			element.on('$destroy', function() {
				scope.closeSearch();
			});

			scope.$on('$routeUpdate', function () {
				scope.init();
			});

			scope.init = function () {
				var search = scope.location.search();
				scope.term = search ? search.term : null;
			};

			scope.init();
		}
	};

});