"use strict";

/* jshint node: true */

var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    createdBy: {
    	userId: mongoose.Schema.Types.ObjectId,
    	username: String,
    	profileImage: String
    },
    title: String,
    content: String,
    tags: Object,
    hearts: { type: Number, default: 0 }
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
