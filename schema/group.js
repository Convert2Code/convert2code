"use strict";

/* jshint node: true */

var mongoose = require('mongoose');

// create a schema
var groupSchema = new mongoose.Schema({
	groupName: String,
	leaderName: String,
	leaderEmail: String,
	district: String,
	groupSize: Number
});

// the schema is useless so far
// we need to create a model using it
var Group = mongoose.model('Group', groupSchema);

// make this available to our users in our Node applications
module.exports = Group;
