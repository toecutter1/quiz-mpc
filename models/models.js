var path = require('path');


//Cargar modelo ORM
var Sequelize = require('sequelize');
//Se configura la base de datos para usar una del tipo sqlite
var sequelize = new Sequelize (null, null, null, 
						{dialect: "sqlite", storage: "quiz.sqlite"}
					);

//Importa la estructura de tabla Quiz
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
//Exporta la definicion de la tabla Quiz
exports.Quiz = Quiz;

//Inicializa la base de datos y crea un registro si está vacía
sequelize.sync().success(function() {
	Quiz.count().success(function (count){
		if ( count === 0 ) {
			Quiz.create({pregunta: '¿Cuál es la capital de Italia?',
						respuesta: 'Roma'
						})
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});