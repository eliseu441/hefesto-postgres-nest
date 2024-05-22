const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/getProjects', function (req,res,next) {
 
        app.root.models.Consultar.getProjects(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    router.get('/getStatus', function (req,res,next) {
 
        app.root.models.Consultar.getStatus(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
   
    return router;
};