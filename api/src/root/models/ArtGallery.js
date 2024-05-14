

const { map } = require('mssql');
const fs = require('fs');
const path = require('path');

class ArtGallery {
    constructor(app) {
        this.app = app;
    }
    async getTypesDesc(params) {
        try {
            
            const result = await this.app.root.services.ArtGallery.getTypesDesc(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async getBioArtists2(params) {
        try {
            
            const result = await this.app.root.services.ArtGallery.getBioArtists2({ad: params.socket.remoteAddress})
            return result
        } catch (error) {
            throw error;
        }
    }
    async getAllArts(params) {
        try {
            
            const result = await this.app.root.services.ArtGallery.getAllArts(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async getPaintersCombo(params) {
        try {
            
            const result = await this.app.root.services.ArtGallery.getPaintersCombo(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async getSculpCarousel(params) {
        try {
            
            const result = await this.app.root.services.ArtGallery.getSculpCarousel(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async getSculptorsCombo(params) {
        try {
            
            const result = await this.app.root.services.ArtGallery.getSculptorsCombo(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async getBuildTable(params) {
        try {
            
            const result = await this.app.root.services.ArtGallery.getBuildTable(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async getBuildContent(params) {
        try {
            
            const result = await this.app.root.services.ArtGallery.getBuildContent(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async getInventors(params) {
        try {
            
            const result = await this.app.root.services.ArtGallery.getInventors(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async getEpochChoices(params) {
        try {
            
            const result = await this.app.root.services.ArtGallery.getEpochChoices(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async getImagesCentury(params) {
        try {
            
            const result = await this.app.root.services.ArtGallery.getImagesCentury(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async getBioArtists(params) {
        try {
            
            const result = await this.app.root.services.ArtGallery.getBioArtists(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async getBCbuilds(params) {
        try {
            
            const result = await this.app.root.services.ArtGallery.getBCbuilds(params)
            return result
        } catch (error) {
            throw error;
        }
    }
}

module.exports = (app) => new ArtGallery(app);

