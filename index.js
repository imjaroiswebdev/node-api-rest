'use strict';

const mongoose = require('mongoose');
const app = require('./app');


// Se tendrá una variable port para que funcione tanto
// en el puerto de desarrollo 3001 como en el de 
// producción que estaría en una variable de entorno
const config = require('./config');


// Primeramente conectarse a la base de datos para asegurar que la API no 
// funcione sin acceso al almacenamiento.
mongoose.connect(config.db, (err, res) => {
	if (err) {
		return console.log(`Error al intentar conectarse a la base de datos:
		${err}`)
	}
	console.log('Conexión con la base de datos establecida...');

	app.listen(config.port, () => {
		console.log(`API REST corriendo en http://localhost:${config.port}`);
	});
});

