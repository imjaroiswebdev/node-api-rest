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
		iat: moment().unix(), // Registro de momento en que se creó el token
		exp: moment().add(14, 'days').unix() // Expira a los 14 días
	}

	// La palabra clave para cifrado 'secret' será almanecedad en el objeto config
	return jwt.encode(payload, config.SECRET_TOKEN)
}

module.exports = createToken