const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/insertProject', function (req,res,next) {
 
        app.root.models.Editar.insertProject(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    router.get('/insertProducts', function (req,res,next) {
 
        app.root.models.Editar.insertProducts(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    router.get('/insertStatus', function (req,res,next) {
        app.root.models.Editar.insertStatus(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    router.get('/insertSubstatus', function (req,res,next) {
 
        app.root.models.Editar.insertSubstatus(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))
    });
    router.get('/insertClient', function (req,res,next) {
 
        app.root.models.Editar.insertClient(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))
    });
    return router;
};