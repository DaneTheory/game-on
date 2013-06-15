'use strict';

app.factory('ConfigService', function($http){

	var Config = function(){
		this.API_URL = '//localhost:3000';
	};

	return new Config();

});