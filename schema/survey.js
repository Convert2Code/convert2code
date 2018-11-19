"use strict";

/* jshint node: true */

var mongoose = require('mongoose');

// create a schema
var eventSchema = new mongoose.Schema({
    createdBy: mongoose.Schema.Types.ObjectId,
    createdAt: {type: Date, default: Date.now},
    name: String,
    content: String,
    registeredUsers: [mongoose.Schema.Types.ObjectId]
});

// the schema is useless so far
// we need to create a model using it
var Survey = mongoose.model('Survey', surveySchema);

// make this available to our users in our Node applications
module.exports = Survey;
