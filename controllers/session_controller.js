//Get /login , formulario de  login

exports.new = function(req, res){
	var errors = req.session.errors || {};
	req.session.errors = {};

	console.log("hola");
	res.render('sessions/new', {errors: errors});

};
 
//POST /login, crear la session 

exports.create = function(req, res){
	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user){
		if (error){ //Si hay error de autenticación devolvemos el error
			req.session.errors = [{"message": 'Se ha producido un error: ' + error}];
			res.redirect('/login');
			return;
		}

		//Crear req.session.user y guardar campos id y user_name
		//La sesion se define por la existencia de req.session.user
		req.session.user = {id:user.id, username:user.username};
		res.redirect(req.session.redir.toString()); //Redirecciona a path anterior a login
	});
};

exports.destroy = function(req, res){
	delete req.session.user;
	res.redirect(req.session.redir.toString()); //Redirecciona a path anterior a login
}