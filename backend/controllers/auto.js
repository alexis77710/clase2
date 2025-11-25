"use strict";

// OJO: Aquí importamos el modelo de Auto que acabamos de crear
var Auto = require("../models/auto");
var path = require("path");
var fs = require("fs");

var controller = {
  home: function (req, res) {
    return res
      .status(200)
      .send("<h1>Bienvenido a la API de la Concesionaria</h1>");
  },

  // 1. Guardar un nuevo carro
  saveAuto: function (req, res) {
    var auto = new Auto();
    var params = req.body;

    // Asignamos los valores del Postman al modelo
    auto.marca = params.marca;
    auto.modelo = params.modelo;
    auto.anio = params.anio;
    auto.color = params.color;
    auto.precio = params.precio;
    auto.imagen = null; // Inicialmente nula

    auto
      .save()
      .then((autoStored) => {
        if (!autoStored)
          return res
            .status(404)
            .send({ message: "No se ha podido guardar el auto" });
        return res.status(200).send({ auto: autoStored });
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ message: "Error al guardar el auto", error: err });
      });
  },

  // 2. Listar todos los carros
  getAutos: function (req, res) {
    Auto.find({})
      .sort()
      .exec()
      .then((autos) => {
        if (!autos || autos.length === 0)
          return res
            .status(404)
            .send({ message: "No hay autos en inventario" });
        return res.status(200).send({ autos });
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ message: "Error al devolver los autos", error: err });
      });
  },

  // 3. Obtener un solo carro por ID
  getAuto: function (req, res) {
    var autoId = req.params.id;

    Auto.findById(autoId)
      .then((auto) => {
        if (!auto)
          return res.status(404).send({ message: "El auto no existe" });
        return res.status(200).send({ auto });
      })
      .catch((err) => {
        if (err.name === "CastError") {
          return res
            .status(404)
            .send({ message: "El ID del auto no es válido" });
        }
        return res
          .status(500)
          .send({ message: "Error al devolver los datos", error: err });
      });
  },

  // 4. Eliminar un carro
  deleteAuto: function (req, res) {
    var autoId = req.params.id;

    Auto.findByIdAndDelete(autoId)
      .then((autoRemoved) => {
        if (!autoRemoved)
          return res
            .status(404)
            .send({ message: "No existe el auto a eliminar" });
        return res.status(200).send({
          auto: autoRemoved,
          message: "Auto eliminado del inventario correctamente",
        });
      })
      .catch((err) => {
        if (err.name === "CastError") {
          return res.status(404).send({ message: "El ID no es válido" });
        }
        return res
          .status(500)
          .send({ message: "Error al eliminar", error: err });
      });
  },

  // 5. Actualizar datos del carro
  updateAuto: function (req, res) {
    var autoId = req.params.id;
    var update = req.body;

    Auto.findByIdAndUpdate(autoId, update, { new: true })
      .then((autoUpdated) => {
        if (!autoUpdated)
          return res
            .status(404)
            .send({ message: "No existe el auto para actualizar" });
        return res.status(200).send({ auto: autoUpdated });
      })
      .catch((err) => {
        if (err.name === "CastError") {
          return res.status(404).send({ message: "El ID no es válido" });
        }
        return res
          .status(500)
          .send({ message: "Error al actualizar", error: err });
      });
  },

  // 6. SUBIR IMAGEN (Código del Inge adaptado)
  uploadImagen: function (req, res) {
    var autoId = req.params.id;
    var fileName = "Imagen no subida...";

    if (req.files) {
      var filePath = req.files.imagen.path;

      // OJO: Si usas Linux o Mac, cambia '\\' por '/'
      var file_split = filePath.split("\\");
      var fileName = file_split[file_split.length - 1];

      var extSplit = fileName.split(".");
      var fileExt = extSplit[extSplit.length - 1];

      if (
        fileExt == "png" ||
        fileExt == "jpg" ||
        fileExt == "jpeg" ||
        fileExt == "gif"
      ) {
        // Actualizar documento de Auto
        Auto.findByIdAndUpdate(autoId, { imagen: fileName }, { new: true })
          .then((autoUpdated) => {
            if (!autoUpdated) {
              // Si no encuentra el auto, borra la imagen que subió para no llenar basura
              fs.unlink(filePath, (unlinkErr) => {
                return res
                  .status(404)
                  .send({ message: "El auto no existe, imagen no guardada" });
              });
            } else {
              return res.status(200).send({ auto: autoUpdated });
            }
          })
          .catch((err) => {
            fs.unlink(filePath, (unlinkErr) => {
              return res
                .status(500)
                .send({ message: "Error al subir la imagen", error: err });
            });
          });
      } else {
        // Eliminar archivo si la extensión es mala
        fs.unlink(filePath, (err) => {
          return res
            .status(200)
            .send({ message: "La extensión de la imagen no es válida" });
        });
      }
    } else {
      return res.status(400).send({ message: "No has subido ninguna imagen." });
    }
  },

  // 7. RECUPERAR IMAGEN (Para mostrarla en el navegador/Postman)
  getImagen: function (req, res) {
    var file = req.params.imagen;
    var path_file = "./uploads/" + file;

    fs.exists(path_file, (exists) => {
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(404).send({ message: "La imagen no existe" });
      }
    });
  },
};

module.exports = controller;
