"use strict";

/* jshint node: true */

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    lastSignInAt: Date,
    profileImage: String,
    interests: [String],
    notifications: [String],
    posts: [mongoose.Schema.Types.ObjectId]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
