var models = require('../models/models.js')
// Autoload - factoriza el código si el path viene on quizID
exports.load= function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
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
			res.render('quizes/show', {quiz: req.quiz});
	};
//GET /quizes/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto'
		if (req.query.respuesta === req.quiz.respuesta){
			resultado = 'Correcto';

		} 
			res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});

};
//GET quizes
exports.index = function(req, res) {
	if (req.query.search === undefined){
		models.Quiz.findAll().then(function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes});
		})
	}
	else{
		var search = '%' + req.query.search.replace(/\s/gi,'%') + '%';
		models.Quiz.findAll({where: {pregunta: { like: search }},
		 order: [["pregunta", "ASC"]]}).then(function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes});	
		})
	}
};

//GET /quizes/create Añadir preguntas

exports.new = function(req, res) {
	var quiz = models.Quiz.build( //crea objeto quiz
		{pregunta: "Pregunta", respuesta: "Respuesta"}
		);
	res.render('quizes/new.ejs', {quiz: quiz});
};
//POST Quizes Create
exports.create = function(req,res) {
	var quiz = models.Quiz.build(req.body.quiz);
	//Guarda en DB los datos pasados por el formulario /quizes/new
	quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		res.redirect('/quizes');
	})
};
