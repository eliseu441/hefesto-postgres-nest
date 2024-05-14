const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    //------------------------------------------------------------------------------------------
    //              ROTAS DE PAGINA UPLOAD
    //------------------------------------------------------------------------------------------


    router.get('/getTypesDesc', function (req,res,next) {
 
        app.root.models.ArtGallery.getTypesDesc(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    router.get('/getBioArtists2', function (req,res,next) {
        app.root.models.ArtGallery.getBioArtists2(req)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    router.get('/getAllArts', function (req,res,next) {
 
        app.root.models.ArtGallery.getAllArts(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    router.get('/getPaintersCombo', function (req,res,next) {
 
        app.root.models.ArtGallery.getPaintersCombo(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    router.get('/getSculpCarousel', function (req,res,next) {
 
        app.root.models.ArtGallery.getSculpCarousel(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    router.get('/getSculptorsCombo', function (req,res,next) {
 
        app.root.models.ArtGallery.getSculptorsCombo(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    router.get('/getBuildTable', function (req,res,next) {
 
        app.root.models.ArtGallery.getBuildTable(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    router.get('/getBuildContent', function (req,res,next) {
 
        app.root.models.ArtGallery.getBuildContent(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    router.get('/getInventors', function (req,res,next) {
 
        app.root.models.ArtGallery.getInventors(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    router.get('/getEpochChoices', function (req,res,next) {
 
        app.root.models.ArtGallery.getEpochChoices(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    router.get('/getImagesCentury', function (req,res,next) {
 
        app.root.models.ArtGallery.getImagesCentury(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    router.get('/getBioArtists', function (req,res,next) {
 
        app.root.models.ArtGallery.getBioArtists(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    router.get('/getBCbuilds', function (req,res,next) {
 
        app.root.models.ArtGallery.getBCbuilds(req.query)
        .then(result => res.status(result.status ? result.status : 200).json(result))
        .catch(err => next(err))

    });
    return router;
};