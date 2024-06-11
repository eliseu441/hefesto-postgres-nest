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
    router.post('/readFile', async (req,res,next) =>{
 
        try {
            if (!req.body.json) {
                let erro = new Error('JSON');
                erro.status = 500
                throw erro
            }
            const params = JSON.parse(req.body.json)
            console.log(req)
            const result = await app.root.models.Editar.readFile(params, req.files)
            res.status(200).json(result)

        } catch (err) {
            next(err);
        }

    })

    return router;
};