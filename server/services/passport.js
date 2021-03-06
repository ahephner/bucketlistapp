var passport = require('passport');
var User = require('../models/user');
var config = require('../config');
var JwtStrategy = require('passport-jwt').Strategy; 
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');

//create local strategy 
//usernameField 'email'
var localOptions = { usernameField: 'email'};
var localLogin = new LocalStrategy(localOptions,  function(email, password, done){
		User.findOne({email: email}, function(err, user){
			if(err) {return done(err);}
			if(!user) {return done(null, false);}

			//compare passwords - is 'password' equal to user.password?
			//compare pw from req with users saved pw
			user.comparePassword(password, function(err, isMatch){
				//if there was an error, return early
				if (err) {return done(err);}
				//if it's not the same, it will return false and say they didnt match up 
				if(!isMatch) {return done(null, false);}
				//if same, it will call passport callback with user model
				return done(null, user);
			});
			//tricky part -> we salted the password, and we need to somehow decode encrypted
			//pw to normal pw. 
		});
		//otherwise, call done with false
});

var jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

//create jwt strategy
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
		//On payload we have sub property. Use the User model, look through all users and find user with id 
		User.findById(payload.sub, function(err, user){
			//In the findById callback, we will get two arguments err and user. Err is going to be
			//populated only if search fails. 
			if (err) {return done(err, false);}
			//if we can find the user, pass it to done callback. They are authenticated
			if (user){
				done(null, user);
			} else {
				//if we can not find user with id, we are going to call done func without user object
				done(null, false);
			}
		});
});

passport.use(jwtLogin);
passport.use(localLogin);
