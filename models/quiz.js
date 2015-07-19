//Definicion del modelo Quiz

module.exports = function (sequelize, DataTypes){
<<<<<<< HEAD
	return sequelize.define('Quiz', { 	pregunta:{ 
											type: DataTypes.STRING,
											validate: { notEmpty: {msg: "--> Falta pregunta"}}
										},
										respuesta:{ 
											type: DataTypes.STRING,
											validate: { notEmpty: {msg: "--> Falta respuesta"}}
										}
									}
	);
=======
	return sequelize.define('Quiz', { pregunta: {
										type: DataTypes.STRING, 
									 	validate: { notEmpty: { msg: "--> Falta Pregunta" }}
									},
									  respuesta: {
										type: DataTypes.STRING, 
									 	validate: { notEmpty: { msg: "--> Falta Respuesta" }}
												}
									}
							);
>>>>>>> aux
}