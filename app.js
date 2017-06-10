'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Se importan los end points generados por el router
const api = require('./routes');


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
// Indicamos a la app que utilice las rutas de los end points generados por api
app.use('/api', api);


module.exports = app;