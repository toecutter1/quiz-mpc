var path = require('path');

//Postgres DATABASE_URL = postgres://user:passwd@host:port/database
//SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;
//Cargar modelo ORM
var Sequelize = require('sequelize');
//Se configura la base de datos para usar una del tipo sqlite
var sequelize = new Sequelize (DB_name, user, pwd, 
						{	dialect: 	protocol,
							protocol: 	protocol,
							port: 		port,
							host: 		host,
							storage: storage, //solo SQLite (.env)
							omitNull: true	//solo Postgress
						}
					);

//Importa la estructura de tabla Quiz
var quiz_path = path.join(__dirname, 'quiz');
var Quiz =sequelize.import(quiz_path);
//Exporta la definicion de la tabla Quiz
exports.Quiz = Quiz;

//Inicializa la base de datos y crea un registro si está vacía
sequelize.sync().then(function() {
	Quiz.count().then(function (count){
		if ( count === 0 ) {
			Quiz.create({pregunta: '¿Cuál es la capital de Portugal?',
						respuesta: 'Lisboa'
						});
			Quiz.create({pregunta: '¿Cuál es la capital de Italia?',
						respuesta: 'Roma'
						})
			.then(function(){console.log('Base de datos inicializada')});
		};
	});
});