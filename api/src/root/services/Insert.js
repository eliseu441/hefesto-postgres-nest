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


            const sql = await dbFIBRA.update({
                sql:`
            INSERT INTO TBA_PROJECTS
            (
                
                COMPANY
                ,PROJECT
                ,DEADLINE
            )
            VALUES
            (
                
                @COMPANY
                ,@PROJECT
                ,@DEADLINE
            )`,
            inputs: [
                { key: 'COMPANY', type: dbFIBRA.Varchar, value: params.company },
                { key: 'PROJECT', type: dbFIBRA.Varchar, value: params.project },
                { key: 'DEADLINE', type: dbFIBRA.DateTime, value: params.date },
            ]
        
    });
    if(sql == 1){
        return {insert: true}
    }else{
        return {insert: false}
    }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }




}

module.exports = new Hefesto();