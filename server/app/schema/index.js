exports = module.exports = function(app, mongoose) {
	require('./PlayerSchema')(app, mongoose);
	require('./VenueSchema')(app, mongoose);
	require('./MatchSchema')(app, mongoose);
}