const express = require('express');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const _ = require('underscore');


const app = express();

const Producto = require('../models/producto');

// ==================================================
// Mostrar todos los productos
// ==================================================
app.get('/producto', verificaToken, (req, res) => {
    // todos
    // populata categoria
    // paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite)

    Producto.find({
            disponible: true
        })
        .sort('nombre')
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            res.json({
                ok: true,
                productos
            });
        });
});

// =======================================
// Mostrar un producto
// =======================================
app.get('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    // un priducto por id
    // populata categoria y usuario

    Producto.findById(id)
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Producto con ID no encontrado"
                    }
                })
            }

            res.json({
                ok: true,
                producto: productoDB
            });
        });
})

// =======================================
// Buscar productos
// =======================================
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    // console.log(regex)

    Producto.find({
            nombre: regex
        })
        .sort('nombre')
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            res.json({
                ok: true,
                productos
            });
        });
})

// =======================================
// Crear nuevo producto
// =======================================
app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;
    let categoria = {
        _id: body.categoria
    }

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: categoria._id,
        usuario: req.usuario._id,
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "No se guardo el producto"
                }
            })
        };

        res.status(201)
            .json({
                ok: true,
                producto: productoDB
            });
    })
});

// =======================================
// actualizacion del producto
// =======================================
app.put('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'disponible', 'categoria']);

    Producto.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };

        res.json({
            ok: true,
            usuario: productoDB
        });
    })
})

// =======================================
// Eliminacion del producto
// =======================================
app.delete('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let cambiaEstado = {
        disponible: false
    };

    Producto.findByIdAndUpdate(id, cambiaEstado, {
        new: true
    }, (err, productoBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };

        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Producto no encontrado"
                }
            })
        };

        res.json({
            ok: true,
            usuario: productoBorrado
        });
    });
})

module.exports = app;