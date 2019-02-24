'use strict';
const MongoClient = require('/config/conexion'),
  chatSchema = require('./schemas').chatSchema;

const models = {

Chat: MongoClient.model('chat', chatSchema)

};

module.exports = models;
