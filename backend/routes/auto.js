'use strict'

var express = require('express');

// 1. Aquí importamos el controlador nuevo de autos
// Asegúrarse que el archivo en la carpeta controllers se llame 'auto.js'
var AutoController = require('../controllers/auto');

var router = express.Router();

// 2. Middleware para subida de archivos
// ESTO ES CLAVE: Necesitas esto para que funcione la subida de imágenes

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });


// --- DEFINICIÓN DE RUTAS ---

// Ruta de prueba
router.get('/home', AutoController.home);




// Rutas del CRUD (Cambiamos 'producto' por 'auto')
router.post('/save-auto', AutoController.saveAuto);
router.get('/auto/:id', AutoController.getAuto);
router.get('/autos', AutoController.getAutos);
router.put('/auto/:id', AutoController.updateAuto);
router.delete('/auto/:id', AutoController.deleteAuto);

// --- RUTAS DE IMÁGENES 
// aquí metemos el 'multipartMiddleware' en medio
// Esto permite que el servidor reciba el archivo antes de pasar al controlador
router.post('/upload-imagen/:id', multipartMiddleware, AutoController.uploadImagen);
// Ruta para ver la imagen
router.get('/get-imagen/:imagen', AutoController.getImagen);
module.exports = router;