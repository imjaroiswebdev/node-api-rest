'use strict';

const express = require('express');
const api = express.Router();

// Controladores
const productCtrl = require('../controllers/product');
const userCtrl = require('../controllers/user');

// Middlewares
const auth = require('../middlewares/auth');


/*************************
**		END POINTS		**
*************************/

// Ruta para petición de productos
api.get('/product', auth, productCtrl.getProducts);

// Ruta para acceder a productos según ID
api.get('/product/:productId', auth, productCtrl.getProductById);

// Ruta para creación de productos
api.post('/product', auth, productCtrl.saveProduct);

// Ruta para actualización de producto de acceso según su ID
api.put('/product/:productId', auth, productCtrl.updateProduct);

// Ruta para eliminar productos de la base de datos según su ID
api.delete('/product/:productId', auth, productCtrl.deleteProduct);

// Ruta para registro de usuarios
api.post('/signup', userCtrl.signUp);

// Ruta para inicio de sesión de usuario
api.post('/signin', userCtrl.signIn);

// Ruta para eliminar usuarios según su email
api.delete('/user/', auth, userCtrl.deleteUser);

// Ruta de pruebas para autenticación
api.get('/private', auth, (req, res) => {
	res.status(200).send({ message: 'Acces granted ^_^' })
});

module.exports = api;