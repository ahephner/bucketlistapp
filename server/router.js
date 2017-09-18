var Auth = require('./controllers/auth');
var passportService = require('./services/passport');
var passport = require('passport');
var User = require('./models/user');

var requireAuth = passport.authenticate('jwt', {session: false});
var requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app){//sets routes
		
		app.get('/', requireAuth, function(req, res){
			res.send('Hello Homepage');
		});

	app.post('/signup', Auth.signup);
	app.post('/signin', requireSignin, Auth.signin);
}
// 	app.get('/', function(req, res, next){
// 		res.send("HELLO HOMEPAGE");

// 	});
// 	app.get('/signup', function(req, res, next){
// 		res.send("Thanks for signing up!")
// 	})
// }