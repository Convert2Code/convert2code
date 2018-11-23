"use strict";

/* jshint node: true */

var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    createdBy: mongoose.Schema.Types.ObjectId,
    content: String,
    title: String
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
