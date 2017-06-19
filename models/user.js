'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Libreria para codificación de la información del usuario en la base de datos
const bcrypt = require('bcrypt-nodejs');

const crypto = require('crypto');

const UserSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	displayname: String,
	avatar: String,	
	// Con select: false se evitan problemas de seguridad cuando se hace GET
	// a la información de los usuarios desde el cliente
	password: { type: String, select: false },
	signupDate: { type: Date, default: Date.now() },
	lastLogin: Date
});

// Con el metodo pre de Mongoose se realizan acciones antes guardar o actualizar
// la información del usuario en la base de datos, en este caso será hashear 
// el password del usuario con bcrypt
UserSchema.pre('save', (next) => {
	let user = this;
	// if(!user.isModified('password')) return next();


	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if(err) return next(err);

			// El password se guarda en hash y no como texto plano
			user.password = hash;
			next();
		});
	});
});

// Para el manejo de las imágenes de perfil de los usuarios
// aprovecharemos la api de Gravatar
UserSchema.methods.gravatar = function() {
	// Para los usuarios cuyo email no tenga un gravatar se le crea un 
	// gravatar aleatorio con el estilo retro
	if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`;

	// Se le asigna un gravatar estilo retro y se almacena en la API
	// de Gravatar con su email hasheado
	const md5 = crypto.createHash('md5').update(this.email).digest('hex');
	return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema);