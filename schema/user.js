"use strict";

/* jshint node: true */

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    lastSignInAt: Date,
    profileImage: { type: String, default: 'default.png' },
    notifications: [String],
    interests: [mongoose.Schema.Types.ObjectId],
    posts: [mongoose.Schema.Types.ObjectId],
    hearted: [mongoose.Schema.Types.ObjectId],
    saved: [mongoose.Schema.Types.ObjectId],
});

var User = mongoose.model('User', userSchema);

module.exports = User;
