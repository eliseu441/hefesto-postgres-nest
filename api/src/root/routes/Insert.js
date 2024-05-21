const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/insertProject', function (req,res,next) {
 
        app.root.models.Insert.insertProject(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    return router;
};