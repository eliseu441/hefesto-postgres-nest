//----------const dbMSSQL = require('../bds/FIBRA');
const dbMSSQL = require('../../database/sqlserver');
const IntlBr = require('intl');
const excel = require('exceljs');
'use strict';
const { networkInterfaces } = require('os');

const ValidationError = require('../../errors/ValidationError');
class getHefesto {

    constructor() {

    }
    async getProjects(params) {
        try {
            const project = await dbMSSQL.query({
                sql: `SELECT ID, PROJECT FROM TBA_PROJECTS `
            });

         
            return project
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getStatus(params) {
        try {
            const status = await dbMSSQL.query({
                sql: `SELECT ID, STATUS FROM TBA_STATUS WHERE ID_PROJECT = @ID_PROJECT`,
                inputs: [
                    { key: 'ID_PROJECT', type: dbMSSQL.Varchar, value: params.id_project }
                ]
            });

         
            return status
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = new getHefesto();