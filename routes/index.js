'use strict';

const express = require('express');
const api = express.Router();

// Controladores
const productCtrl = require('../controllers/product');


/*************************
**		END POINTS		**
*************************/

// Ruta para petición de productos
api.get('/product', productCtrl.getProducts);

// Ruta para acceder a productos según ID
api.get('/product/:productId', productCtrl.getProductById);

// Ruta para creación de productos
api.post('/product', productCtrl.saveProduct);

// Ruta para actualización de producto de acceso según su ID
api.put('/product/:productId', productCtrl.updateProduct);

// Ruta para eliminar productos de la base de datos según su ID
api.delete('/product/:productId', productCtrl.deleteProduct);

module.exports = api;