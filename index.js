'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// Se tendrá una variable port para que funcione tanto
// en el puerto de desarrollo 3000 como en el de 
// producción que estaría en una variable de entorno
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
	res.send({ message: 'Hello World!' })
});

app.listen(port, () => {
	console.log(`API REST corriendo en http://localhost:${port}`);
});

