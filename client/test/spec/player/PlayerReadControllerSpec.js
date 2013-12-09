'use strict';

describe('Controller: PlayerReadController', function () {

	// load the controller's module
	beforeEach(module('gameOn'));

	var MainCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		MainCtrl = $controller('PlayerReadCtrl', {
			$scope: scope
		});
	}));

	it('...', function () {
		var foo = true;
		expect(foo).toBe(true);
	});
});
