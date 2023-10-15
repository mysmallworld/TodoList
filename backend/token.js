const MY_TOKEN = require('./env');
const express = require('express');
const app = express();

module.exports = app.use((req, res, next) => {
    if(req.headers['token'] == MY_TOKEN){
        console.log("Token correct !");
    }else{
       res.status(403).send("Oups ! Ce n'est pas le bon token...");
    }
    next();
})