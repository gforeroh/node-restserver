const express = require('express');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const _ = require('underscore');

const app = express();

const Categoria = require('../models/categoria');

// ==================================
// Mostrar todas las categorias
// ==================================
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            res.json({
                ok: true,
                categorias
            });
        });

});

// ==================================
// Mostrar una categoria por ID
// ==================================
app.get('/categoria/:id', (req, res) => {
    let id = req.params.id;

    Categoria.findById(id)
        .populate('usuario', 'nombre email')
        .exec((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        };

        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


// ==================================
// Crear una nueva categoria
// ==================================
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    // regresar la categoria
    // req.usuario._id

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });


});

// ==================================
// Actualiza una categoria por ID
// ==================================
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);
    // let body = req.body;

    // let desCategoria = {
    //     descripcion: body.descripcion
    // }

    // regresar la categoria
    // req.usuario._id

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });


});


// ==================================
// Elimina una categoria por ID
// ==================================
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        };

        if (!categoriaBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Categoria no encontrado"
                }
            })
        };

        res.json({
            ok: true,
            message: 'Categoria borrada',
            categoria: categoriaBorrado
        });


    });




});



module.exports = app;