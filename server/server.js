require('./config/config')

const express = require('express');
const mongoose = require('mongoose');
const path = require('path')

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

// HABILITAR FOLDER PUBLIC
app.use(express.static(path.resolve(__dirname, '../public')));

// console.log(path.resolve(__dirname, '../public'));


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

/**
 *  Client ID
    890399689280-ifi5odch84q7mcaj507hktjdeo0bbb6m.apps.googleusercontent.com
    Client Secret
    9Z-r-Uw0eGTNroWRDhdnZpWw
 */

 /**
  * 890399689280-k1hfr0tl14rl11jo0r22fhpe2lcvdi20.apps.googleusercontent.com
  * QnrejPLvaA8u7IlfhWi3hw-V
  */

  /**
   * https://accounts.google.com/signin/oauth/oauthchooseaccount?client_id=890399689280-ibssvsuqpbujat36o7s7sc4s3a49a4cl.apps.googleusercontent.com&as=DspxIb7m0xKCmLCp-L-SOg&destination=http%3A%2F%2Flocalhost%3A3000&approval_state=!ChR0eEZsRkxKN0hpc0dJS0ltNGxXTRIfb3pqTnFzWm82TzRaVUU3MWpGWk5XazFUeW5oekZCYw%E2%88%99AF-3PDcAAAAAXopVe-u-iec3hH3E1v06N3RJfL0FLWIb&oauthgdpr=1&xsrfsig=ChkAeAh8T53o0ah_GQxwb0F_D4ozb1d9nMMuEg5hcHByb3ZhbF9zdGF0ZRILZGVzdGluYXRpb24SBXNvYWN1Eg9vYXV0aHJpc2t5c2NvcGU&flowName=GeneralOAuthFlow
   */