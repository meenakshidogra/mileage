'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var readings = require('../../app/controllers/readings.server.controller');

	// Readings Routes
	app.route('/readings')
		.get(readings.list)
		.post(users.requiresLogin, readings.create);

    app.route('/readings/car/:carId')
        .get(readings.listByCar)

	app.route('/readings/:readingId')
		.get(readings.read)
		.put(users.requiresLogin, readings.hasAuthorization, readings.update)
		.delete(users.requiresLogin, readings.hasAuthorization, readings.delete);

	// Finish by binding the Reading middleware
	app.param('readingId', readings.readingByID);
	app.param('carId', readings.readingsByCarID);
};
