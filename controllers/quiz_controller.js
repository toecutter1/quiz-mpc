var models = require('../models/models.js')
// Autoload - factoriza el código si el path viene on quizID
exports.load= function(req, res, next, quizId){
	models.Quiz.find({
		where: { id: Number(quizId)},
		include: [{model: models.Comment}]
	}).then(
		function(quiz){
			if (quiz){
			req.quiz = quiz;
			next();
			} else { next (new Error('No existe quizId= ' + quizId));}

		}
	).catch(function(error) { next(error);});
};

// GET /quizes/question
exports.show = function(req, res){
			res.render('quizes/show', {quiz: req.quiz, errors: [] });
	};
//GET /quizes/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto'
		if (req.query.respuesta === req.quiz.respuesta){
			resultado = 'Correcto';

		} 
			res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: [] });

};
//GET quizes
exports.index = function(req, res) {
	if (req.query.search === undefined){
		models.Quiz.findAll().then(function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes, errors: [] });
		})
	}
	else{
		var search = '%' + req.query.search.replace(/\s/gi,'%') + '%';
		models.Quiz.findAll({where: {pregunta: { like: search }},
		 order: [["pregunta", "ASC"]]}).then(function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes, errors: [] });	
		})
	}
};

//GET /quizes/create Añadir preguntas

exports.new = function(req, res) {
	var quiz = models.Quiz.build( //crea objeto quiz
		{pregunta: "Pregunta", respuesta: "Respuesta", tematica: "Tematica"}
		);
	res.render('quizes/new', {quiz: quiz, errors: [] });
};
//POST Quizes Create
exports.create = function(req,res) {
	var quiz = models.Quiz.build( req.body.quiz ); 

	//Guarda en DB los datos pasados por el formulario /quizes/new despues de validarlos en la DB

	quiz
	.validate()
	.then(
		function(err){
			if (err){
				res.render('quizes/new', { quiz: quiz, errors: err.errors });
				//res.render('/quizes/new', {quiz:quiz, errors: [] });
			} else {
				quiz.save({fields: ["pregunta", "respuesta", "tematica"]}).then(function(){
				res.redirect('/quizes');
				})
			}
		}	
	).catch(function(error){next(error)});
};
	
//GET /quizes/edit
exports.edit = function(req, res){
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors: []});
};
//PUT /quizes/:quizId
exports.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tematica = req.body.quiz.tematica;

	req.quiz
	.validate()
	.then(
		function(err){
			if (err){
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors });
			} else {
				req.quiz
				.save( { fields: ["pregunta", "respuesta", "tematica"] })
				.then(function(){ res.redirect('/quizes');});

			}
		}
		);
};

//DELETE /quizes/:quizId
exports.destroy = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
};