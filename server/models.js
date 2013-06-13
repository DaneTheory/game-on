exports = module.exports = function(app, mongoose) {
	require('./schemas/player.schema')(app, mongoose);
	require('./schemas/venue.schema')(app, mongoose);
	require('./schemas/match.schema')(app, mongoose);
}