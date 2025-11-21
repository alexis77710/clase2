//use strict 
'use strict'
var mongoose= require('mongoose');
var port= 3600;
//promesas nativas de javascript
mongoose.promise=global.promise;
//importacion de los servicios de express
var app=require('./app');
//conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/tienda')
.then(()=>{
    console.log("la conexion a la base de datos se realizo con exito");
    app.listen(port,()=>{
        console.log("el servidor establecido en la url: localhost:3600");

    })
})
.catch(err=>console.log(err));

/* 'use strict' 
var mongoose= require('mongoose');
var port= 3600;
//promesas nativas de javascript
mongoose.promise=global.promise;
importacion de los servidores de express
var app= require('./app');
conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/tienda')
.then(()=>{
    console.log("la conexion a sido exitosa");
    app.listen(port,()=>{
        console.log("el servidor corre en url= localhost:3600");
        })
    
    })
        .catch(err=>console.log(err));








*/