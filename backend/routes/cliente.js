'use strict'

var express = require('express');
var ClienteController = require('../controllers/cliente');

var router = express.Router();

// Ruta para guardar cliente
router.post('/registro', ClienteController.saveCliente);

module.exports = router;