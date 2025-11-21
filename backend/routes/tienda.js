'use strict'

var express = require('express');

//importamos el controlador de tienda que creamos recien 
var tiendaController= require('../controllers/tienda');

var router = express.Router();

//definimos las rutas
//cuando alguien entre a la ruta /home se ejecuta el metodo home del controlador tienda
router.get('/home', tiendaController.home);
router.get('/test', tiendaController.test);

//ruta nueva para guardar productos usamos post en lugar de get
router.post('/save-producto', tiendaController.saveProducto);

//ruta nueva con parametro
//el ":id" le dice a express que va a venir un valor variable
router.get('/producto/:id', tiendaController.getProducto);

//ruta nueva para listar todos los productos
router.get('/productos', tiendaController.getProductos);

//ruta nueva para actualizar los productos PUT
router.put('/producto/:id', tiendaController.updateProducto);

//ruta nueva para eliminar un producto DELETE
router.delete('/producto/:id', tiendaController.deleteProducto);

module.exports = router;
