

const { map } = require('mssql');
const fs = require('fs');
const path = require('path');

class getHefesto {
    constructor(app) {
        this.app = app;
    }
    async getProjects(params) {
        try {
            
            const result = await this.app.root.services.Consultar.getProjects(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async getStatus(params) {
        try {
            
            const result = await this.app.root.services.Consultar.getStatus(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async getCards(params) {
        try {
            
            const result = await this.app.root.services.Consultar.getCards(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async getClients(params) {
        try {
            
            const result = await this.app.root.services.Consultar.getClients(params)
            return result
        } catch (error) {
            throw error;
        }
    }
   
}

module.exports = (app) => new getHefesto(app);

