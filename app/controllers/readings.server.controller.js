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
    console.log(req.reading);
    /*calculate the fuel economy here and put it in req.reading.mileage variable*/
    /**
    ** getMileage
    **
    ** @desc Function to calculate the mileage of the car
    ** @param newReading - The reading of the odometer of the car just after refill
    ** @param oldReading - The reading of the odometer of the car last time the car was refilled
    ** @param fuelAmount - Amount of the fuel filled to full the fule tank of the car.
    **                     This could be red on the meter of the station pump or in the receipt
    */
    var getMileage = function (newReading, oldReading, fuelAmount) {
        var distanceCovered = 0;
        if (isNumber(newReading) && isNumber(oldReading)) {
            distanceCovered = Number(newReading) - Number(oldReading);
        }
        if(isNumber(fuelAmount)) {
            //mileage is distance covered divided by the fuelAmount spent
            var mileage = distanceCovered/Number(fuelAmount);
            //return the rounded off value
            return Math.round(mileage * 10) / 10;
        }
        return null;
    };

    /**
    ** isNumber
    **
    ** @desc returns true if the value is positive numeric (decimal number or integer)
    ** @param value - Any string
    **/
    var isNumber = function (value) {
        return /*TODO $.isNumeric(value) &&*/ (value > 0);
    };

    Reading.find({})
    .where('created').lt(req.reading.created)
    .where('car').equals(req.reading.car)
    /*TODO: add the conditions for same car and user*/
    .limit(1)
    .sort('-created')
    .exec(function(err, post){
        var mileage = 0;
        if (post && post.length>0) {
            mileage = getMileage(req.reading.odoreading, post[0].odoreading, req.reading.fuelreading);
        }
        res.jsonp({'data':req.reading, 'mileage': mileage});
    });

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

/**
 * Reading authorization middleware
 */
exports.hasSelectedCar = function(req, res, next) {
	if (req.reading.car !== req.car.id) {
		return res.status(403).send('Car is not selected');
	}
	next();
};


