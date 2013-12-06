//
// # Search Directive
// Creates a search widget with input field and search button.
// The input field is hidden by default and it slides to the right as the user hits the search button.
// 
// When the search is done (user hits enter in the input field) it automatically 
// redirects to `/search` route passing the term as a parameter.
//
// 2013 Pablo De Nadai
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
					'<input type="text" class="search-query form-control" placeholder="Search for upcoming games" ng-model="term" ng-show="isSearchOpen" focus="isSearchOpen" escape="openSearch()" blur="closeSearch()" enter="search(term)"/>' +
					'<button class="btn btn-info" ng-show="!isSearchOpen" ng-click="openSearch()"><i class="fa fa-search fa-lg"></i> Search</button>' +
				'</div>' +
			'</form>',
		replace: true,
		controller: function($scope, $location) {
			$scope.location = $location;
		},
		link: function (scope, element) {
			scope.term = '';
			scope.isSearchOpen = false;

			// Used to manage the input visibility
			scope.openSearch = function () {
				scope.isSearchOpen = true;
			};

			// Used to manage the input visibility
			scope.closeSearch = function () {
				scope.isSearchOpen = false;
			};

			// Redirects the `route` to `/search` passing the `term` as query param.
			scope.search = function (term) {
				var query = { 'term': term };
				if (!term) query = '';
				scope.location.path('/search').search(query);
			};

			element.on('$destroy', function() {
				scope.closeSearch();
			});

			// Listens to the `routeUpdate` to update the term.
			scope.$on('$routeUpdate', function () {
				scope.updateTerm();
			});

			// Update the scope in case the `term` query param has changed.
			scope.updateTerm = function () {
				var search = scope.location.search();
				scope.term = search ? search.term : null;
			};

			scope.updateTerm();
		}
	};

});