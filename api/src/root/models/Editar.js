

const { map } = require('mssql');
const fs = require('fs');
const path = require('path');

class editHefesto {
    constructor(app) {
        this.app = app;
    }
    async insertProject(params) {
        try {
            
            const result = await this.app.root.services.Editar.insertProject(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async insertProducts(params) {
        try {
            
            const result = await this.app.root.services.Editar.insertProducts(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async insertStatus(params) {
        try {
            
            const result = await this.app.root.services.Editar.insertStatus(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async insertSubstatus(params) {
        try {
            
            const result = await this.app.root.services.Editar.insertSubstatus(params)
            return result
        } catch (error) {
            throw error;
        }
    }
    async insertClient(params) {
        try {
            
            const result = await this.app.root.services.Editar.insertClient(params)
            return result
        } catch (error) {
            throw error;
        }
    }
}

module.exports = (app) => new editHefesto(app);

