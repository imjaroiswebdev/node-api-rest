'use strict';

/*=========================================================
/*	Modulo de servicio para codifición y creación de JWT
/*========================================================*/

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken (user) {
	const payload = {
		sub: user._id,
		iat: moment().unix(), // Registro al momento en que se creó el token
		exp: moment().add(14, 'days').unix() // Expira a los 14 días
	};

	// La palabra clave para cifrado 'secret' será almanecedad en el objeto config
	return jwt.encode(payload, config.SECRET_TOKEN)
};


function decodeToken(token) {
	const decoded = new Promise((resolve, reject) => {
		try{
			const payload = jwt.decode(token, config.SECRET_TOKEN);

			// Verificación del tiempo de expiración del token
			if (payload.exp <= moment().unix()) {
				reject({
					status: 401,
					message: 'El token ha expirado'
				})
			};
			resolve(payload.sub)
		} catch (err) {
			reject({
				status: 500,
				message: 'Token Invalido'
			})
		}
	});

	return decoded;
}

module.exports = {
	createToken,
	decodeToken
}