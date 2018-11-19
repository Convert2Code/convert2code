"use strict";

/* jshint node: true */

/* TODO
 *
 * 1. Incorporate Bycrypt
 * 2. Incorporate session
 * 3. Finish stub of requireLogin
 */

/************************
 *
 *	NEEDED SERVER MODS
 *
 ************************/

var mongoose = require('mongoose');
var session = require('client-sessions');
var bodyParser = require('body-parser');
var async = require('async');

/************************
 *
 *				SCHEMA
 *
 ************************/

var Participant = require('./schema/participant.js');
var Group = require('./schema/group.js');

var User = require('./schema/user.js');
var Post = require('./schema/post.js');

/************************
 *
 *				SERVER
 *
 ************************/

var express = require('express');
var app = express();

mongoose.connect('mongodb://localhost/convert2code');

app.use(express.static(__dirname));
app.use(bodyParser.json());

/************************
 *
 *		NO DB FUNCTIONS
 *
 ************************/

// Build out stub
var requireLogin = function(req, res, next) {
	console.log(req);
	console.log(res);
	console.log(next);
  if (!req.session._id) {
    res.redirect('/login');
  } else {
    next();
  }
};

app.get('/', function (req, res) {
	res.send('Simple web server of files from ' + __dirname);
});

/************************
 *
 *		HOLIDAY HACK
 *
 ************************/

app.post('/participant/new', function(req, res) {

	var participant = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		district: req.body.district
  };

  Participant.create(participant, function(err, participant) {
  	if(err) {
  		console.log('Error registering participant');
		  res.status(400).send(JSON.stringify('Participant not registered'));
		  return;
  	}
  	console.log('New Participant Registered!');
    res.status(200).send(participant);
    return
  });
});

app.post('/group/new', function(req, res) {

	var group = {
		groupName: req.body.groupName,
		leaderFirstName: req.body.leaderFirstName,
		leaderLastName: req.body.leaderLastName,
		leaderEmail: req.body.leaderEmail,
		district: req.body.district,
		groupSize: req.body.groupSize
  };

  Group.create(group, function(err, group) {
  	if(err) {
  		console.log('Error creating group');
		  res.status(400).send(JSON.stringify('New group not created'));
		  return;
  	}
  	console.log('New Group Registered!');
    res.status(200).send(group);
    return
  });
});

app.get('/participants/all', function(req, res) {
	Participant.find({}, function(err, participants) {
		if(err) {
			console.log('Error fetchings participants');
		  res.status(400).send(JSON.stringify('Unable to find all participants'));
		  return;
		}
		console.log('Found all participants');
		console.log(participants);
    res.status(200).send(JSON.stringify(participants));
    return
	});
});

app.get('/groups/all', function(req, res) {
	Group.find({}, function(err, groups) {
		if(err) {
			console.log('Error fetchings groups');
		  res.status(400).send(JSON.stringify('Unable to find all groups'));
		  return;
		}
		console.log('Found all groups');
    res.status(200).send(groups);
    return
	});
});

/************************
 *
 *				 USER
 *
 ************************/

/* TODO: revisit security and id checking */
app.post('/user/login', function(req, res) {});
app.post('/user/new', function(req, res) {
	/* Incorporate BYCRYPT */
	var newUser = {
		_id: mongoose.Types.ObjectId(),
		username: req.body.username,
		password: req.body.password,
		lastSignInAt: Date.now,
		interests: req.body.interests,
		notifications: req.body.notifications
	};

	User.create(newUser, function(err, user) {
		if(err) {
			console.log('Error creating new user: ' + err);
		  res.status(400).send(JSON.stringify('Unable to create new user'));
		  return;
		}
		console.log('New user created: ' + user.username);
	  res.status(200).send(user);
	  return
	});
});

app.get('/user/:id', function(req, res) {

	var userId = req.params.id;

	User.findOne({ _id: userId }, function(err, user) {
		if(err) {
			console.log('Error finding user: ' + err);
		  res.status(400).send(JSON.stringify('Unable to find user'));
		  return;
		}
		console.log('Sucessfully found information for: ' + user.username);
		res.status(200).send(JSON.stringify(user));
		return;
	});
});

app.post('/user/:id/update', function(req, res) {

	var userId = req.params.id;

	User.findOne({ _id: userId }, function(err, user) {
		if(err) {
			console.log('Error finding user: ' + err);
	  	res.status(400).send(JSON.stringify('Unable to find user'));
	  	return;
		}

		/* TODO: Figure out how to update a user and what to update */

		user.save();

		console.log('Sucessfully retrieved: ' + user.username);
		res.status(200).send(JSON.stringify(user));
		return;
	});
});

app.post('/user/:id/delete', function(req, res) {

	var userId = req.params.id;

	User.findOne({ _id: userId }, function(err, user) {
		if(err) {
			console.log('Error deleting user: ' + err);
	  	res.status(400).send(JSON.stringify('Unable to delete user'));
	  	return;
		}

		var username = user.username
		user.delete();

		console.log('Sucessfully deleted: ' + username);
		res.status(200).send(JSON.stringify('Sucessfully deleted: ' + username));
		return;
	});
});

app.get('/user/:id/posts', function(req, res) {

	var userId = req.params.id;

	Post.find({ createdBy: userId }, function(err, posts) {
		if(err) {
			console.log('Error finding posts for user: ' + userId +' : ' + err);
	  	res.status(400).send(JSON.stringify('Unable to find posts for: ' + userId));
	  	return;
		}
		console.log('Sucessfully retrieved posts for: ' + user.username);
		res.status(200).send(JSON.stringify(posts));
		return;
	});
});

/************************
*
*				 POST
*
************************/

app.post('/post/new', function(req, res) {});
app.get('/post/:id', function(req, res) {});
app.post('/post/:id/update', function(req, res) {});
app.post('/post/:id/delete', function(req, res) {});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
