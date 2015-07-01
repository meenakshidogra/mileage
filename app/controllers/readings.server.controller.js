'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Reading = mongoose.model('Reading'),
	_ = require('lodash');

/**
 * Create a Reading
 */
exports.create = function(req, res) {
	var reading = new Reading(req.body);
	reading.user = req.user;
	reading.car = req.body.car;

	reading.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reading);
		}
	});
};

/**
 * Show the current Reading
 */
exports.read = function(req, res) {
    res.jsonp(req.reading);
};

/**
 * Update a Reading
 */
exports.update = function(req, res) {
	var reading = req.reading ;
	reading = _.extend(reading , req.body);

	reading.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reading);
		}
	});
};

/**
 * Delete an Reading
 */
exports.delete = function(req, res) {
	var reading = req.reading ;

	reading.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reading);
		}
	});
};

/**
 * List of Readings
 */
exports.list = function(req, res) {
    /*Add the condition to show the readings of the logged in user only*/
	Reading.find().sort('-created').populate('user', 'displayName').populate('car', 'name').exec(function(err, readings) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(readings);
		}
	});
};

/**
 * List of Readings by Car
 */
exports.listByCar = function(req, res) {
    res.jsonp(req.readings);
};

/**
 *
 */
exports.readingsByCarID = function(req, res, next, carid) {
    console.log(carid);
    /*Add the condition to show the readings of the logged in user only*/
	Reading.find()
    .where('car').equals(carid)
    .sort('-created').populate('user', 'displayName')
    .exec(function(err, readings) {
        console.log(readings);
		if (err) return next(err);
		if (! readings) return next(new Error('Failed to load Readings for car' + carid));
        req.readings=readings;
        next();
	});

};

/**
 * Reading middleware
 */
exports.readingByID = function(req, res, next, id) {
	Reading.findById(id).populate('user', 'displayName').populate('car', 'name').exec(function(err, reading) {
		if (err) return next(err);
		if (! reading) return next(new Error('Failed to load Reading ' + id));
		req.reading = reading ;
		next();
	});
};

/**
 * Reading authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.reading.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
