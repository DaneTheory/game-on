'use strict';

app.factory('PlayerModel', function ($http, API_URL) {

	this.collection = null;
	this.player = {
		username: null,
        password: null, // TODO: Remove this field from response.
        email: null, // TODO: Remove this field from response.
        name: null,
        dateOfBirth: null,
        position: null,
        location: null,
        rate: null,
        bio: null
	};

	this.getById = function (playerId) {
		return $http.get(API_URL + '/player/' + playerId)
			.success(angular.bind(this, function (data) {
				this.player = data.payload[0];
			}))
			.error(angular.bind(this, function() {
				this.player = null;
			}));
	};

	this.getCollection = function () {
		return $http.get(API_URL + '/player')
			.success(angular.bind(this, function (data){
				this.collection = data.payload;
			}))
			.error(angular.bind(this, function(){
				this.collection = null;
			}));
	};

	return this;

});