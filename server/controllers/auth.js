//handle sign in and out
var User = require('../models/user');

exports.signup = function(req, res, next){
	//1grab incomming request using two variables email/password
	var email = req.body.email;
	var password = req.body. password;

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
				res.json({success:true});
			});
	});

}
