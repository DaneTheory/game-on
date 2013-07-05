'use strict';

app.factory('AuthenticationModel', function ($cookieStore) {

	// Default values.
	this.isSignedIn = $cookieStore.get('isSignedIn');
	this.errorStatus = null;

	this.setIsSignedIn = function(value) {
		this.isSignedIn = value;

		if (value) {
			this.errorStatus = null;
			$cookieStore.put('isSignedIn', true);
		} else {
			$cookieStore.remove('isSignedIn');
		}
	};

	return this;

});