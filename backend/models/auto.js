'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AutoSchema = Schema({
    marca: String,
    modelo: String,
    anio: Number,     // En lugar de RAM/ROM
    color: String,    // Agregamos color
    precio: Number,
    imagen: String    // Aquí se guardará el nombre del archivo
});

module.exports = mongoose.model('Auto', AutoSchema);

'use strict'
