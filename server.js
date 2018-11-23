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
var express = require('express');
var bcrypt = require('bcrypt');

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

var app = express();

var BCRYPT_SALT_ROUNDS = 12;

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
		district: req.body.district,
		age: req.body.age,
		experience: req.body.experience
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
		leaderName: req.body.leaderName,
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

app.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		if(err) {
			console.log('Error finding users: ' + err);
		  res.status(400).send(JSON.stringify('Unable to find users'));
		  return;
		}
		console.log('Sucessfully found information for users');
		res.status(200).send(JSON.stringify(users));
		return;
	});
});

/* TODO: add requirelogin() */

/* TODO: revisit security and id checking */
app.post('/user/login', function(req, res) {
	/* Incorporate BYCRYPT */

	var username = req.body.username;
	var password = req.body.password;

	User.findOne({ username: username }, function(err, user) {
		if(err) {
			console.log('Error finding user with that username: ' + err);
		  res.status(400).send(JSON.stringify('Unable to find a user with that username'));
		  return;
		}

		bcrypt.compare(password, user.password, function(_err, samePassword) {
  		if(samePassword) {
  			console.log('Sucessfully logged in user: ' + user.firstName + ' ' + user.lastName);

  			// Update lastSignInAt

  			/* REINCORPORATE BCRYPT
	  		req.session._id = user._id;
		    req.session.username = username;
		    req.session.firstName = user.firstName;
		    req.session.lastName = user.lastName;
		    */

	  		res.status(200).send(JSON.stringify(user));
				return;
  		}
  		else {
				console.log("Error authenticating user: incorrect password");
				res.status(400).send();
				return;
  		}
  	});
	});
});

app.post('/user/new', function(req, res) {
	/* Incorporate BYCRYPT */
	var newUser = {
		_id: mongoose.Types.ObjectId(),
		username: req.body.username,
		password: req.body.password,
		lastSignInAt: Date.now(),
		interests: req.body.interests,
		notifications: req.body.notifications // Would a new user have any notifications?
	};

	bcrypt.hash(newUser.password, BCRYPT_SALT_ROUNDS).then(function(hashedPassword) {

		newUser.password = hashedPassword;

		User.create(newUser, function(err, user) {
			if(err) {
				console.log('Error creating new user: ' + err);
			  res.status(400).send(JSON.stringify('Unable to create new user'));
			  return;
			}
			console.log('New user created: ' + user.username);
		  res.status(200).send(JSON.stringify(user));
		  return
		});
	}).catch(function(err) {
		console.log('Unable to hash given string');
    res.status(400).send(JSON.stringify(err));
		return;
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
		console.log('Sucessfully retrieved posts for: ' + userId);
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

var server = app.listen(80, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
