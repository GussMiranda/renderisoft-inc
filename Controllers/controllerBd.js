'use strict';
const express = require('express'),
  router = express.Router(),
  Chat = require('./models').Chat;

router.route('/')

    .get(function (req, res) {
        Chat.find()
        .then(function (chats) {
            res.locals.chats = chats;
            return res.render('public/server.html');
        });
    });
    
    router.post('/chat', async (req, res, next) => {
        const chtCtrl = new Chat(req.body);
        await chtCtrl.save();
        res.redirect('/');
      });