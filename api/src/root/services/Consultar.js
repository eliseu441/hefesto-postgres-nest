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
                sql: `SELECT * FROM TBA_STATUS WHERE ID_PROJECT = @ID_PROJECT ORDER BY STATUS`,
                inputs: [
                    { key: 'ID_PROJECT', type: dbMSSQL.Int, value: params.id_project }
                ]
            });

         
            return status
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getCards(params) {
        try {
            const status = await dbMSSQL.query({
                sql: `
                SELECT DISTINCT
                (ROW_NUMBER() OVER  (ORDER BY A.ID_STATUS) - 1) AS ID
                ,COUNT(*) AS TOTAL 
                ,A.ID_STATUS
                ,B.STATUS
                ,SUM(CASE WHEN DATEADD(day, 1, A.ENTRANCE) > A.ENTRANCE THEN 1 ELSE 0 END) AS SLA
                 FROM TBF_CLIENTS AS A 
                INNER JOIN TBA_STATUS AS B ON A.ID_STATUS = B.ID
                LEFT JOIN TBA_SUBSTATUS AS C ON C.ID = A.ID_SUBSTATUS
                WHERE B.ID_PROJECT = 1
                GROUP BY A.ID_STATUS, A.ENTRANCE, B.STATUS`,
                inputs: [
                    { key: 'ID_PROJECT', type: dbMSSQL.Int, value: params.id_project }
                ]
            });

         
            return status
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
   
    async getClients(params) {
        try {
            const status = await dbMSSQL.query({
                sql: `
                SELECT * FROM TBF_CLIENTS WHERE ID_STATUS = @STATUS`,
                inputs: [
                    { key: 'ID_PROJECT', type: dbMSSQL.Int, value: params.status }
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