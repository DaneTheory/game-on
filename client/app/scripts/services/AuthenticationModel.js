'use strict';

app.factory('AuthenticationModel', function ($cookieStore) {

	// Default values.
	this.isSignedIn = $cookieStore.get('isSignedIn');
	this.err = null;

	return this;

});