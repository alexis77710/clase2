'use strict'

var Cliente = require('../models/cliente');

var controller = {
    saveCliente: function(req, res){
        var cliente = new Cliente();
        var params = req.body;

        cliente.email = params.email;
        cliente.password = params.password;

        cliente.save().then(clienteStored=>{
            if(!clienteStored) return res.status(404).send({message: 'No se pudo registrar'});
            return res.status(200).send({cliente: clienteStored});
        })
        .catch(err=>{
            return res.status(500).send({message: 'Error al guardar'});
        });
    }
};
module.exports= controller;