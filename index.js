'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Conexión con los esquemas de la base de datos
const Product = require('./models/product');


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
	Product.find({}, (err, products) => {
		// Para errores internos
		if (err) return res.status(500).send({message: `Error al tratar de ubicar el producto ${err}`});
		// Si el producto no existe en la base de datos
		if (!products) return res.status(404).send({message: 'No hay productos actualmente.'});

		res.status(200).send({ products });
	});
});

// Ruta para acceder a productos según ID
app.get('/api/product/:productId', (req, res) => {
	let productId = req.params.productId;

	// Se ubica el producto por su ID en la base de datos a través de find()
	// con el metodo de Mongoose
	Product.findById(productId, (err, product) => {
		// Para errores internos
		if (err) return res.status(500).send({message: `Error al tratar de ubicar el producto ${err}`});
		// Si el producto no existe en la base de datos
		if (!product) return res.status(404).send({message: 'El producto no existe.'});

		// Producto ubicado product: product (reducido a solo product, ya que 
		// el objeto y la clave tienen el mismo nombre)
		res.status(200).send({ product });
	});
});

// Ruta para creación de productos
app.post('/api/product', (req, res) => {
	console.log('POST /api/product');
	console.log(req.body);

	let product = new Product();

	product.name = req.body.name;
	product.picture = req.body.picture;
	product.price = req.body.price;
	product.category = req.body.category;
	product.description = req.body.description;

	// Almacenamiento del nuevo producto en la base de datos
	product.save((err, productStored) => {
		if (err) res.status(500)
			.send({
				message: `Error al intentar guardar en la base de datos: ${err}`
			});

		res.status(200).send({product: productStored});
	});
});

// Ruta para actualización de producto de acceso según su ID
app.put('/api/product/:productId', (req, res) => {

});

// Ruta para eliminar productos de la base de datos según su ID
app.delete('/api/product/:productId', (req, res) => {

});

// Primeramente conectarse a la base de datos para asegurar que la API no 
// funcione sin acceso al almacenamiento.
mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
	if (err) {
		return console.log(`Error al intentar conectarse a la base de datos:
		${err}`)
	}
	console.log('Conexión con la base de datos establecida...');

	app.listen(port, () => {
		console.log(`API REST corriendo en http://localhost:${port}`);
	});
});

