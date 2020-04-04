// ==================================
// PORT
// ==================================

process.env.PORT = process.env.PORT || 3000;


// ==================================
// ENTORNO
// ==================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ==================================
// BASE DE DATOS
// ==================================

let urlDB;
const user = 'gerardof';
const pass = '2gfilhbCUfzNoiPr';
const db = 'cafe';

if (process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = `mongodb://${user}:${pass}@cluster0-shard-00-00-xdycp.mongodb.net:27017,cluster0-shard-00-01-xdycp.mongodb.net:27017,cluster0-shard-00-02-xdycp.mongodb.net:27017/${db}?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin`;
    // urlDB = `mongodb+srv://${user}:${pass}@cluster0-xdycp.mongodb.net/${db}`;
}

process.env.URLDB = urlDB;
