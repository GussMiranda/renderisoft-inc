'use strict';

const mongoose = require ('mongoose');
const {MongoClient} = require ('./keys'); 
mongoose.connect(MongoClient.URI, {useNewUrlParser: true}).then(
    db => console.log('Database is connected')
).catch(
        err=> console.error(err)
    );