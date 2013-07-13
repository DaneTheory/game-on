'use strict';

app.factory('MatchModel', function ($http, API_URL, AuthenticationModel) {

	this.collection = null;
	this.match = {
		venue: null,
		players: null,
		when: null,
		price: null,
		organizer: null,
		meta: {
			created: null,
			modified: null
		}
	};

	var getParams = {
		populate: [
			'venue',
			'players',
			'organizer'
		].join(',')
	};

	var processCollection = function (collection) {
		_.each(collection, function (match) {
			var players = match.players;
			var otherPlayers = _.where(players, function (player) {
				return player._id !== AuthenticationModel.player._id;
			});

			match.playersDisplay = otherPlayers.splice(0, 3);
			match.playersExtra = otherPlayers.splice(0);
		});

		return collection;
	};

	this.getById = function (matchId) {
		return $http.get(API_URL + '/match/' + matchId, {
				params: getParams
			})
			.success(angular.bind(this, function (data) {
				this.match = data.payload[0];
			}))
			.error(angular.bind(this, function () {
				this.match = null;
			}));
	};

	this.getCollection = function () {
		return $http.get(API_URL + '/match', {
				params: getParams
			})
			.success(angular.bind(this, function(data){
				this.collection = processCollection(data.payload);
			}))
			.error(angular.bind(this, function(){
				this.collection = null;
			}));
	};

	this.join = function (match) {
		return $http.post(API_URL + '/match/' + match._id + '/join')
			.success(angular.bind(this, function (data){
				match.players.push(AuthenticationModel.player);
			}))
			.error(angular.bind(this, function(){
				console.log('MatchModel join error');
			}));
	};

	this.leave = function (match) {
		return $http.post(API_URL + '/match/' + match._id + '/leave')
			.success(angular.bind(this, function (){

				var playerIndex = _.findIndex(match.players, function (player) {
					return player._id == AuthenticationModel.player._id;
				});

				if (playerIndex > -1) {
					match.players.splice(playerIndex, 1);
				}

			}))
			.error(angular.bind(this, function(){
				console.log('MatchModel leave error');
			}));
	};

	return this;

});