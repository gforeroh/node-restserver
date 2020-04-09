const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

var productoSchema = new Schema({
    nombre: { 
        type: String, 
        required: [true, 'El nombre es necesario'] 
    },
    precioUni: { 
        type: Number, 
        required: [true, 'El precio Únitario es necesario'] 
    },
    descripcion: { 
        type: String, 
        required: false 
    },
    disponible: { 
        type: Boolean, 
        required: true, default: true 
    },
    categoria: { 
        type: Schema.Types.ObjectId, 
        ref: 'Categoria', 
        required: true 
    },
    usuario: { 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario' 
    }
});

// Apply the uniqueValidator plugin to userSchema.
// productoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico.' });


module.exports = mongoose.model('Producto', productoSchema);