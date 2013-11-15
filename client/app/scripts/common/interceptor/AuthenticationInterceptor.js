//
//
//

'use strict';

app.factory('AuthenticationInterceptor', function ($q, $injector) {
	return {
		response: function (response) {
			// Bypass the success.
			return response;
		},
		responseError: function (response) {
			// Sign out if the user is no longer authorized.
			if (response.status == 401) {
				var AuthenticationService = $injector.get('AuthenticationService');
				AuthenticationService.signOut();
			}
			
			return $q.reject(response);
		}
	};
});