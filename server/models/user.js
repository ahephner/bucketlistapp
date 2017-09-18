var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
	email: {
		type: String, 
		unique: true, //this unique wont allow duplicates for email signups aka 1 email = 1 account
		lowercase: true  //mongo does not know the difference between cases so we account for that on our end so if you try to 	AJ@FMC.COM and aj@fmc.com  mongo thinks these are two different users so the lowercase fixs that 

	} ,
	password: String
});

userSchema.pre('save', function(next){
	var user = this; 
	bcrypt.genSalt(10, function(err, salt){
		if(err) {return next(err);}

		bcrypt.hash(user.password, salt, null, function(err, hash){
			if (err) {return next(err);}
			user.password = hash;
			next();
		});
	});
});
//this tells mongoose that there is a new Schema called 'userSchema'
//which corresponds to a collection called 'user' (the first parameter)
var model = mongoose.model('user', userSchema);

module.exports = model; 