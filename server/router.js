var Auth = require('./controllers/auth');
var User = require('./models/user');


module.exports = function(app){//sets routes
	app.post('/signup', Auth.signup)
}
// 	app.get('/', function(req, res, next){
// 		res.send("HELLO HOMEPAGE");

// 	});
// 	app.get('/signup', function(req, res, next){
// 		res.send("Thanks for signing up!")
// 	})
// }