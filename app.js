'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// Motor de plantillas para renderizado de vistas
const hbs = require('express-handlebars');

const app = express();

// Se importan los end points generados por el router
const api = require('./routes');


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Configuración  de las plantillas
app.engine('.hbs', hbs({
	defaultLayout: 'default',
	extname: '.hbs'
}));
app.set('view engine', '.hbs');


// Indicamos a la app que utilice las rutas de los end points generados por api
app.use('/api', api);

// Renderizados de vistas
app.get('/login', (req, res) => {
	res.render('login')
});
app.get('/', (req, res) => {
	res.render('product')
});


module.exports = app;