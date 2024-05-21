

const { map } = require('mssql');
const fs = require('fs');
const path = require('path');

class Hefesto {
    constructor(app) {
        this.app = app;
    }
    async insertProject(params) {
        try {
            
            const result = await this.app.root.services.Insert.insertProject(params)
            return result
        } catch (error) {
            throw error;
        }
    }
}

module.exports = (app) => new Hefesto(app);

