'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Se tendrá una variable port para que funcione tanto
// en el puerto de desarrollo 3001 como en el de 
// producción que estaría en una variable de entorno
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

/*************************
**		END POINTS		**
*************************/

// Ruta para petición de productos
app.get('/api/product', (req, res) => {
	res.status(200).send({products: []});
});

// Ruta para acceder a productos según ID
app.get('/api/product/:productId', (req, res) => {

});

// Ruta para creación de productos
app.post('/api/product', (req, res) => {
	console.log(req.body);
	res.status(200).send({message: 'Producto creado exitosamente.'});
});

// Ruta para actualización de producto de acceso según su ID
app.put('/api/product/:productId', (req, res) => {

});

// Ruta para eliminar productos de la base de datos según su ID
app.delete('/api/product/:productId', (req, res) => {

});

// Primeramente conectarse a la base de datos para asegurar que la API no 
// funcione sin acceso al almacenamiento.
mongoose.connect('mongodb://localhost/27017/shop', (err, res) => {
	if (err) {
		return console.log(`Error al intentar conectarse a la base de datos:
		${err}`)
	}
	console.log('Conexión con la base de datos establecida...');

	app.listen(port, () => {
		console.log(`API REST corriendo en http://localhost:${port}`);
	});
});

