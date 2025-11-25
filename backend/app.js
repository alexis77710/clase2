"use strict";

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// 1. CARGAR RUTAS
// Aquí importamos el archivo que creamos en el paso anterior (routes/auto.js)
var auto_routes = require("./routes/auto");

var cliente_routes = require('./routes/cliente');
// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIGURACIÓN DE CABECERAS Y CORS
// Esto déjalo tal cual, es vital para que no te bloqueen las peticiones
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// 2. RUTAS BASE
// Aquí le decimos que use las rutas de autos y le ponemos el prefijo '/api'
app.use("/api", auto_routes);
app.use('/api', cliente_routes);

module.exports = app;
