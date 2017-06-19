'use strict';

/*==================================================
/*	Middleware para verificación de autorización	
/*	en acceso a rutas
/*================================================*/

// Servicios para codificación y decodificación
const services = require('../services');


function isAuth(req, res, next) {
	// Si el header de la solicitud no presenta ninguna forma del token
	// debido a que no es una forma valida de la solicitud de autorización 
	// se niega el acceso y se detiene la ejecución de la solicitud
	if(!req.headers.authorization) {
		return res.status(403).send({
			message: 'No tiene autorización para acceder a este recurso'
		})
	}

	// Se extrae del header de la solicitud el token con split
	// aprovechando que viene en el formato 'bearer token'
	const token = req.headers.authorization.split(' ')[1];

	// Decodificación del token con el 'secret'
	services.decodeToken(token)
		.then(response => {
			req.user = response;
			// Se pasa el payload decoficado que resulte de la promesa
			// en decodeToken para continuar con el proximo controlador
			next();
		})
		.catch(response => {
			res.status(response.status)
		});
}

module.exports = isAuth;