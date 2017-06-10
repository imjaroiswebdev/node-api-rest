'use strict'

// Modelos
// Conexión con los esquemas de la base de datos
const Product = require('../models/product');

// Petición de productos
function getProducts (req, res) {
	console.log('GET /api/product');
	Product.find({}, (err, products) => {
		// Para errores internos
		if (err) return res.status(500).send({message: `Error al tratar de ubicar el producto ${err}`});
		// Si el producto no existe en la base de datos
		if (!products) return res.status(404).send({message: 'No hay productos actualmente.'});

		res.status(200).send({ products });
	});	
};


// Petición de producto por ID
function getProductById (req, res) {
	console.log('GET /api/product/:productId');
	let productId = req.params.productId;

	// Se ubica el producto por su ID en la base de datos a través de find()
	// con el metodo de Mongoose.
	// Este metodo exige que el endpoint incluya el el id del proudcto para 
	// satisfacer la variable productId
	Product.findById(productId, (err, product) => {
		// Para errores internos
		if (err) return res.status(500).send({message: `Error al tratar de ubicar el producto ${err}`});
		// Si el producto no existe en la base de datos
		if (!product) return res.status(404).send({message: 'El producto no existe.'});

		// Producto ubicado product: product (reducido a solo product, ya que 
		// el objeto y la clave tienen el mismo nombre)
		res.status(200).send({ product });
	})
};


// Creación de producto
function saveProduct (req, res) {
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
	})
};


// Actualización de producto
function updateProduct (req, res) {
	console.log('PUT /api/product/');
	let productId = req.params.productId,
		update = req.body;

	Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
		if (err) res.status(500).send({message: `Ha ocurrido un error al intentar actualizar el producto: ${err}`});
		
		res.status(200).send({ product: productUpdated });
	})	
};


// Eliminar producto
function deleteProduct (req, res) {
	console.log('DELETE /api/product');

	let productId = req.params.productId;

	Product.findById(productId, (err, product) => {
		if (err) res.status(500).send({message: `Ha ocurrido un error al intentar eliminar el producto: ${err}`});

		product.remove(err => {
			if (err) res.status(500).send({message: `Ha ocurrido un error al intentar eliminar el producto: ${err}`});
			res.status(200).send({message: 'Producto eliminado satisfactoriamente.'});
		})
	})	
}

module.exports = {
	getProducts,
	getProductById,
	saveProduct,
	updateProduct,
	deleteProduct
}