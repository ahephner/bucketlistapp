//handle sign in and out
var User = require('../models/user');
var jwt=require('jwt-simple');
var config = require('../config');


//issuing a JSON webtoken below
//iat (issued at) use basic js date method to get time with timestamp variable to pass in as the vaule for iat prop
//sub (subject) makes user.id a principle this way if the user changes their email down the road they still get stored info becasue we issue the token at the creation based on user.id which never changes. 


function createUserToken(user){
	var timestamp = new Date().getTime();
	return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
}
exports.signin = function(req, res, next){
	//User has already had their email and pw auth
	//we just need to give them a token 
	res.send({token: createUserToken(req.user) });
}
exports.signup = function(req, res, next){
	//1grab incomming request using two variables email/password
	var email = req.body.email;
	var password = req.body. password;

	if(!email || !password){
		return res.status(418).send({error: 'You must provide email and pw.'});
	}
	//2 (check if a user with this email exists)findOne is going to go through the database and see if this users has an email there
	//(err, existingUser) is a call back function will run after database is seached if there was an error because user already exists
	User.findOne({email: email}, function(err, existingUser){
			if(err){
				return next(err);
			}//handle search error

			if(existingUser){
				// return res.status(418).send(err);
			 return res.status(418).send("email in use");
			}//handles existing users
			
			//3 Create a user if that user doesn"t exist already
			var user = new User({
				email: email,
				password: password
			});

			//To save the record to the DB.
			user.save(function(err){
				if(err) {return next(err);}
				//4 Resond to request indidcating the user was created
				res.json({token: createUserToken(user)});
			});
	});

}
