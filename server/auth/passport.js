"use strict"; 

let LocalStrategy = require('passport-local').Strategy;
let mongojs = require('mongojs');

module.exports = function(passport, config) {

	let db = mongojs(config.db_endpoint, ['users']);

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, done){
		process.nextTick(function(){
			db.users.findOne({username: username}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email already taken'));
				} else {
					let user = {};
					user.username = username;
					user.password = password;
					user.role = "teacher";
					db.users.save(user, function(err, user){
						console.log("5-->")
						if(err){
							return done(err);
						}
						return done(null, user);
					});
				}
			})
		});
	}));

	passport.use('local-login', new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, username, password, done){
			process.nextTick(function(){
				db.users.findOne({ username: username}, function(err, user){
					if(err)
						return done(err);
					if(!user)
						return done(null, false, req.flash('loginMessage', 'No User found'));
					if(!user.passwor){
						return done(null, false, req.flash('loginMessage', 'invalid password'));
					}
					return done(null, user);
				});
			});
		}
	));

	
};