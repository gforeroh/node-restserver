const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const fs = require('fs');
const path = require('path');


app.use(fileUpload());

app.put('/upload/:tipo/:id', function(req, res) {
    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No se ha seleccionado ningun archivo."
            }
        });
    }

    // Validar tipo
    let tiposValidos = ['productos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "Tipo no permitido. Tipos validos son: " + tiposValidos.join(', '),
                tipo
            }
        })
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let archivo = req.files.archivo;

    let nameFileOrg = archivo.name;
    let nombreCortado = nameFileOrg.split('.');
    let ext = nombreCortado[nombreCortado.length - 1].toLowerCase();

    // Extensiones permitidas
    let extencionesValidas = ['png', 'jpg', 'gif', 'jepg']
    if (extencionesValidas.indexOf(ext) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "Archivo no permitido. Extensiones validas: " + extencionesValidas.join(', '),
                ext
            }
        })
    }

    // Cambiar nombre del archivo
    let nameFile = `${id}-${new Date().getMilliseconds()}.${ext}`;

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${tipo}/${nameFile}`, (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        switch (tipo) {
            case 'usuarios':
                imagenUsuario(id, res, nameFile, tipo);
                break;
            case 'productos':
                imagenProducto(id, res, nameFile, tipo);
                break;

            default:
                break;
        }
    });
});

function imagenUsuario(id, res, nameFile, tipo) {
    Usuario.findById(id)
        .exec((err, usuarioDB) => {
            if (err) {
                borrarArchivo(nameFile, tipo);
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            if (!usuarioDB) {
                borrarArchivo(nameFile, tipo);
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Usuario con ID no encontrado"
                    }
                })
            }

            borrarArchivo(usuarioDB.img, tipo);

            usuarioDB.img = nameFile;

            usuarioDB.save((err, usuarioGuardo) => {
                res.json({
                    ok: true,
                    usuario: usuarioGuardo,
                    img: nameFile
                });
            })
        });
}

function imagenProducto(id, res, nameFile, tipo) {
    Producto.findById(id)
        .exec((err, productoDB) => {
            if (err) {
                borrarArchivo(nameFile, tipo);
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            if (!productoDB) {
                borrarArchivo(nameFile, tipo);
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Producto con ID no encontrado"
                    }
                })
            }

            borrarArchivo(productoDB.img, tipo);

            productoDB.img = nameFile;

            productoDB.save((err, productoGuardado) => {
                res.json({
                    ok: true,
                    usuario: productoGuardado,
                    img: nameFile
                });
            })
        });
}

function borrarArchivo(nombreImagen, tipo) {
    let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);

    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage)
    }
}


module.exports = app;