"use strict";

/* jshint node: true */

var mongoose = require('mongoose');

// create a schema
var messageSchema = new mongoose.Schema({
  sentTo: mongoose.Schema.Types.ObjectId,
  sentFrom: mongoose.Schema.Types.ObjectId,
  sentAt: {type: Date, default: Date.now},
  content: String,
  readAt: {type: Boolean, default: false},
});

var threadSchema = new mongoose.Schema({
	participants: [{ userId: mongoose.Schema.Types.ObjectId, fullName: String}],
	messages: [messageSchema]
});

// the schema is useless so far
// we need to create a model using it
var Thread = mongoose.model('Thread', threadSchema);

// make this available to our users in our Node applications
module.exports = Thread;
