'use strict';

/* ==============================================================
/*	Modulo de autenticación de usuario a través JSON Web Token	
/*=============================================================*/

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
		displayName: req.body.displayName,
		password: req.body.password
	});

	user.save((err) => {
		if (err) res.status(500).send({
			message: `Error en la creación de ususario: ${err}`
		});

		// El jwt será creado a través de un servicio externo para
		// garantizar la escalabilidad futura y modularización del
		// código.	
		return res.status(201).send({ token: service.createToken(user) })
	})
};

// Función para inicio de sesión
function signIn (req, res) {
	// Se busca al usuario por su email
	User.findOne({ email: req.body.email }, (err, user) => {
		if(err) return res.status(500).send({ message: `Ha ocurrido un error interno: ${err}` });
		if(!user) return res.status(404).send({ message: 'No existe el usuario' });

		req.user = user;

		res.status(200).send({
			message: 'Access Granted ^_^',
			// Se crea un nuevo token 
			token: service.createToken(user),
			// Se suministra la foto de perfil del usuario
			imgProfile: user.gravatar()
		})
	});
};

// Función para borrar usuarios
function deleteUser (req, res) {
	console.log('DELETE /api/user');

	// Se usa findOne de Mongoose en vez de User.remove para evitar borrado
	// de mas de un elemento por error
	User.findOne({ email: req.body.email }, (err, user) => {
		if(err) return res.status(500).send({ message: `Ha ocurrido un error interno: ${err}` });
		if(!user) return res.status(404).send({ message: 'No existe el usuario' });

		user.remove(err => {
			if (err) res.status(500).send({ message: `Ha ocurrido un error al intentar borrar el usuario: ${err}` });
			res.status(200).send({ message: 'El usuario fue eliminado exitosamente.' })
		})
	});
};

module.exports = {
	signUp,
	signIn,
	deleteUser
}