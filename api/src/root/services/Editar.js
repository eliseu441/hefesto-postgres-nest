//----------const dbMSSQL = require('../bds/FIBRA');
const dbMSSQL = require('../../database/sqlserver');
const IntlBr = require('intl');
const excel = require('exceljs');
'use strict';
const { networkInterfaces } = require('os');

const ValidationError = require('../../errors/ValidationError');
class editHefesto {

    constructor() {

    }
   
    async insertProject(params) {
        try {


            const sql = await dbMSSQL.update({
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
                { key: 'COMPANY', type: dbMSSQL.Varchar, value: params.company },
                { key: 'PROJECT', type: dbMSSQL.Varchar, value: params.project },
                { key: 'DEADLINE', type: dbMSSQL.DateTime, value: params.date },
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
    
    async insertProducts(params) {
        try {

            const id_project = await dbMSSQL.query({
                sql:`SELECT TOP (1) ID FROM TBA_PROJECTS WHERE PROJECT = @PROJECT `,
                inputs: [
                    { key: 'PROJECT', type: dbMSSQL.Varchar, value: params.project }
                ]
        });
        console.log(id_project[0])
            for(let el of params.insertProducts){
                const sql = await dbMSSQL.update({
                    sql:`
                INSERT INTO TBF_GENERAL_STOCK
                (
                    ITEM
                    ,QUANTITY
                    ,PRICE
                    ,ENTRANCE
                    ,ID_PROJECT
                )
                VALUES
                (
                    
                    @ITEM
                    ,@QUANTITY
                    ,@PRICE
                    ,CONVERT(date, CURRENT_TIMESTAMP)
                    ,@ID_PROJECT
                )`,
                inputs: [
                    { key: 'ITEM', type: dbMSSQL.Varchar, value: el.item },
                    { key: 'QUANTITY', type: dbMSSQL.Int, value: el.quantity },
                    { key: 'PRICE', type: dbMSSQL.Int, value: el.price },
                    { key: 'ID_PROJECT', type: dbMSSQL.Int, value: id_project[0].ID },
                ]
        });
            }
            return
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = new editHefesto();