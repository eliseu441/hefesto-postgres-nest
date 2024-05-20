//----------const dbFIBRA = require('../bds/FIBRA');
const dbFIBRA = require('../../database/sqlserver');
const IntlBr = require('intl');
const excel = require('exceljs');
'use strict';
const { networkInterfaces } = require('os');

const ValidationError = require('../../errors/ValidationError');
class Hefesto {

    constructor() {

    }
   
    async insertProject(params) {
        try {
            

            const sql = await dbFIBRA.query({
                sql:`
            INSERT INTO TBF_EQUIPAMENTO_INSTALACAO
            (
                
                COMPANY
                ,PROJECT
                ,PRICE
                ,DEADLINE
            )
            VALUES
            (
                
                @COMPANY
                ,@PROJECT
                ,@PRICE
                ,@DEADLINE
            )`,
            inputs: [
                { key: 'COMPANY', type: dbFIBRA.Int, value: 'testeC' },
                { key: 'PROJECT', type: dbFIBRA.Int, value: 'testeP' },
                { key: 'PRICE', type: dbFIBRA.Int, value: 10 },
                { key: 'DEADLINE', type: dbFIBRA.Int, value: '2024-05-20' },
            ]
        
    });

            return sql
        } catch (error) {
            console.error(error);
            throw error;
        }
    }




}

module.exports = new Hefesto();