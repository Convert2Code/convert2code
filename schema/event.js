"use strict";

/* jshint node: true */

var mongoose = require('mongoose');

// create a schema
var eventSchema = new mongoose.Schema({
    createdBy: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    eventTitle: { type: String, default: 'New Event' },
    steps: [ 	{ step: String,
    						notes: String,
    						assignedTo: String,
    						completed: { type: Boolean, default: false } }
    				],
    registeredUsers: [mongoose.Schema.Types.ObjectId]
});

// the schema is useless so far
// we need to create a model using it
var Event = mongoose.model('Event', eventSchema);

// make this available to our users in our Node applications
module.exports = Event;
