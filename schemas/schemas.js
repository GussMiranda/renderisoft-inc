'use strict';
const MongoClient = require('/config/conexion'),
      Schema = MongoClient.Schema;

const schemas = {

    chatSchema: new Schema({
        username: {type: String},
        mensaje: {type: String},
    })

};

module.exports = schemas;