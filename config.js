// Objeto con configuración para la base de datos
// en producción port y db serán establecidas por las variables
// de entorno PORT y MONGODB
module.exports = {
	port: process.env.PORT || 3001,
	db: process.env.MONGODB || 'mongodb://localhost:27017/shop',
	SECRET_TOKEN: 'claveMasComplejaParaCifradoDelToken'
}