"use strict";

/* jshint node: true */

var mongoose = require('mongoose');

// create a schema
var participantSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	district: String,
	age: Number,
	experience: Number
});

// the schema is useless so far
// we need to create a model using it
var Participant = mongoose.model('Participant', participantSchema);

// make this available to our users in our Node applications
module.exports = Participant;
