'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Reading Schema
 */
var ReadingSchema = new Schema({
	odoreading: {
		type: Number,
		default: 0,
		required: 'Please fill odometer reading',
	},
    fuelreading: {
        type: Number,
        default: 0,
        required: 'Please fill fuel reading',
    },
    distanceunit: {
        type: String,
    },
    fuelunit: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    },
    car: {
        type: Schema.ObjectId,
        ref: 'Car'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }

});

mongoose.model('Reading', ReadingSchema);
