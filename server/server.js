require('./config/config')

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

// CONFIGURACIÓN GLOBAL DE RUTAS
app.use(require('./routes'));

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err, res)=> {
    if(err) throw err;
        console.log("Base de datos ONLINE");
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
})

// Base de datos MongoDB

// gerardof
// 2gfilhbCUfzNoiPr

// mongodb://gerardof:2gfilhbCUfzNoiPr@cluster0-shard-00-00-xdycp.mongodb.net:27017,cluster0-shard-00-01-xdycp.mongodb.net:27017,cluster0-shard-00-02-xdycp.mongodb.net:27017/test?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin
// mongodb+srv://gerardof:2gfilhbCUfzNoiPr@cluster0-xdycp.mongodb.net/admin