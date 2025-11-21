'use strict'

var Producto = require('../models/producto');

var controller ={
//metodo de prueba 
home: function(req, res){
    return res.status(200).send({
        message: 'home de mi tienda veterinaria'
    });
},
// otro metodo de prueba
test: function(req, res){
    return res.status(200).send({
        message: 'soy el metodo o accion de prueba del controlador de tienda'

    });
},

//metodo para guardar un nuevo producto
saveProducto: function(req, res){
    var producto = new Producto();

    //recogemos los parametros que nos llegan por la peticion body
    var params = req.body;

    //asignamos valores al objeto del modelo
// validamos que lleguen los datos para que no guarde vacios si no queremos
if(params.nombre){
    producto.nombre = params.nombre;
    producto.descripcion = params.descripcion;
    producto.categoria = params.categoria;
    producto.precio = params.precio;
    producto.imagen = null;

    //guardamos el producto en la base de datos
    //mongoose moderno usa promesas (.then y .catch)
    producto.save()
    .then(productoStored=>{
        if(!productoStored){
            return res.status(404).send({message: 'no se ha podido guardar el producto'});
    }
    return res.status(200).send({producto: productoStored});
    
    })
    .catch((err)=>{
        return res.status(500).send({message:'error al guardar el documento'});

    });
    
} else{
    return res.status(200).send({
        message: 'el nombre del producto es obligatorio'
    });

}
},

//metodo ára obtener un producto por su id
getProducto: function(req, res){
    var productoId = req.params.id;

    if(!productoId) return res.status(404).send({message: 'el producto no existe'});

    //buscamos en bvase de datos
    Producto.findById(productoId)
    .then((producto)=>{
        if(!producto) return res.status(404).send({message:'el producto no existe'});

        return res.status(200).send({producto});

    })
    .catch((err)=>{
        return res.status(500).send({message: 'error al devolver los datos'});

    })

},

//metodo para listar todos los productos
getProductos: function(req,res){
    // find ({}) vacio significa "buscame todo lo que encuentres"
    Producto.find({})
    .then((productos)=>{
        if(!productos) return res.status(404).send({message: 'no hay productos para mostrar'});

        return res.status(200).send({productos});

    })
    .catch((err)=>{
        return res.status(500).send({message: 'error al devolver los datos'});

    });
},

//metodo para actualizar un producto
updateProducto: function(req,res){
    var productoId = req.params.id; //el id que viene por la URL
    var update = req.body; //los datos nuevos que vienen por el body

    //findByIdAndUpdate(id, datos_a_actualizar, {new:true})
    //el {new:true} es vital: le dice a mongo que nos devuelva el dato ya actualizado

    Producto.findByIdAndUpdate(productoId, update, {new:true})
    .then((productoUpdated)=>{
        if(!productoUpdated) return res.status(404).send({message:'no existe el producto para actualizar'});

        return res.status(200).send({producto: productoUpdated});

    })
    .catch((err)=>{
        return res.status(500).send({message:'error al actualizar el producto'});
    });
},

// metodo para borrar un producto
deleteProducto: function(req,res){
    var productoId = req.params.id;

    Producto.findByIdAndDelete(productoId)
    .then((productoRemoved)=>{
        if(!productoRemoved) return res.status(404).send({message: 'no se ha podido borrar el producto '});

        return res.status(200).send({producto: productoRemoved});

    })
    .catch((err)=>{
        return res.status(500).send({message: 'error al borrar el producto'});

    });
}

};

module.exports = controller;