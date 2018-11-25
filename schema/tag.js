"use strict";

/* jshint node: true */

var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
	tag: String,
	relations: Number,
	backgroundColor: String,
	fontColor: String,
	createdBy: mongoose.Schema.Types.ObjectId
});

var Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
