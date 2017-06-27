

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema de Productos para almacenamiento en la base de datos

const ProductSchema = Schema({
	name: String,
	picture: String,
	price: { type: Number, default: 0 },
	category: { type: String, enum: ['laptops', 'telefonos', 'accesorios'] },
	description: String
});

module.exports = mongoose.model('Product', ProductSchema);