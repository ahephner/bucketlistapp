module.exports = function(app){

	app.get('/', function(req, res, next){
		res.send("HELLO HOMEPAGE");

	});
	app.get('/signup', function(req, res, next){
		res.send("Thanks for signing up!")
	})
}