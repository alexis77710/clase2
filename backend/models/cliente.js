'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    email: String,
    password: String,
    Fecha: { type: Date, Default: Date.now}
});

module.exports = mongoose.model('Cliente', ClienteSchema);

