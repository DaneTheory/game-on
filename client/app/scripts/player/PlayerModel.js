//
//
//

'use strict';

app.factory('PlayerModel', function ($http, ApiUrl, DateHelper, TokenMatcherHelper) {

	this.collection = null;
	this.player = {
		username: null,
        password: null, // TODO: Remove this field from response.
        email: null, // TODO: Remove this field from response.
        name: null,
        location: null,
        rate: null,
        gender: null,
        birthday: null,
        city: null,

        // Calculated properties
        age: null,
        imageUrl: null
	};

	var processPlayers = function (players) {
		_.each(players, function (player) {
			player.id = player._id;

			// Age
			var birthday = new Date(player.birthday);
			player.age = DateHelper.getAgeFromBirthday(birthday);

			// Imager Url
			var template = 'http://www.gravatar.com/avatar/{0}?s=100&d=mm',
				hash = player.email ? md5(player.email.trim().toLowerCase()) : '';
			player.imageUrl = TokenMatcherHelper.replaceNumberedTokens(template, [hash]);
		});

		return players;
	};

	this.getById = function (playerId) {
		return $http.get(ApiUrl + '/player/' + playerId)
			.success(angular.bind(this, function (data) {
				this.player = _.first(processPlayers(data.payload));
			}))
			.error(angular.bind(this, function() {
				this.player = null;
			}));
	};

	this.getCollection = function () {
		return $http.get(ApiUrl + '/player')
			.success(angular.bind(this, function (data){
				this.collection = processPlayers(data.payload);
			}))
			.error(angular.bind(this, function(){
				this.collection = null;
			}));
	};

	return this;

});