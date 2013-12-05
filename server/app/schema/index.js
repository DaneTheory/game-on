exports = module.exports = function(app, mongoose) {
	require('./PlayerSchema')(app, mongoose);
	require('./VenueSchema')(app, mongoose);
	require('./GameSchema')(app, mongoose);
	require('./FeedSchema')(app, mongoose);
};