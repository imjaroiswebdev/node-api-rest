'use strict';

/* ==============================================================
/*	Modulo de autenticación de usuario a través JSON Web Token	
/*=============================================================*/

const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services');

// Función para registro de usuarios
function signUp (req, res) {
	// El proceso de creación del usuario no necesitará que se almacene
	// el password, ya que el mismo modelo user lo almacena hasheado al
	// al momento en que se construye con el con los pre metodos 
	// configurados en el mismo modelo. Igualmente sucede con el signupDate
	// y el avatar. 
	const user = new User({
		email: req.body.email,
		displayName: req.body.displayName
	});

	user.save((err) => {
		if (err) res.status(500).send({
			message: `Error en la creación de ususario: ${err}`
		});

		// El jwt será creado a través de un servicio externo para
		// garantizar la escalabilidad futura y modularización del
		// código.	
		return res.status(200).send({ token: service.createToken(user) })
	})
};

// Función para inicio de sesión
function signIn (req, res) {

}

module.exports = {
	signUp,
	signIn
}