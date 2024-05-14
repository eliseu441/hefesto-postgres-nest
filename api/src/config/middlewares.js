const express = require('express')
const compression = require('compression')
const cors = require('cors')
const fileUpload = require('express-fileupload');

module.exports = app => {
    app.use(express.json({ limit: '50mb' }))
    app.use(compression())
    app.use(cors())
    app.use(fileUpload({

        createParentPath: true,
    
        limits: { fileSize: 100 * 1024 * 1024 },
    
        abortOnLimit: true,
    
        responseOnLimit: 'O arquivo excedeu o limite de 100 Mbytes'
    
    }));
    
}