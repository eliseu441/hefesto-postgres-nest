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
                sql: `
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
            if (sql == 1) {
                return { insert: true }
            } else {
                return { insert: false }
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async insertProducts(params) {
        try {
            const pool = await dbMSSQL.getPool()
            const id_project = await dbMSSQL.query({
                sql: `SELECT TOP (1) ID FROM TBA_PROJECTS WHERE PROJECT = @PROJECT `,
                inputs: [
                    { key: 'PROJECT', type: dbMSSQL.Varchar, value: params.project }
                ],
                pool
            });

            for (let el of params.insertProducts) {
                const sql = await dbMSSQL.update({
                    sql: `
                INSERT INTO TBF_GENERAL_STOCK
                (   ITEM
                    ,QUANTITY
                    ,PRICE
                    ,ENTRANCE
                    ,ID_PROJECT
                )
                VALUES
                (   @ITEM
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
                    ],
                    pool
                });
                if (sql !== 1) {
                    await pool.rollback()
                    await dbMSSQL.closePool(pool)
                    return { insert: false }
                }
            }
            await dbMSSQL.closePool(pool)
            return { insert: true }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async insertStatus(params) {
        try {
            const getOrder = await dbMSSQL.query({
                sql: `SELECT [ORDER] FROM TBA_STATUS WHERE ID = @ID `,
                inputs: [
                    { key: 'ID', type: dbMSSQL.Int, value: params.order_id !== 0 ? params.order_id : 0 }
                ]
            }); 
            let order = getOrder.length !==0 ? getOrder[0].ORDER : 50 
            if( getOrder.length !==0){
                        const add = await dbMSSQL.update({
                            sql: `
                            UPDATE TBA_STATUS
                            SET [ORDER] = [ORDER] + 1 WHERE [ORDER] > @ORDER`,
                            inputs: [
                                { key: 'ORDER', type: dbMSSQL.Decimal, value: order }
                            ]
                        });
                        const subtract = await dbMSSQL.update({
                            sql: `
                            UPDATE TBA_STATUS
                            SET [ORDER] = [ORDER] - 1 WHERE [ORDER] < @ORDER`,
                            inputs: [
                                { key: 'ORDER', type: dbMSSQL.Decimal, value: order + 1 }
                            ]
                        });
            }
            if(params.order_id == '0'){
                const getData = await dbMSSQL.query({
                    sql: `SELECT * FROM TBA_STATUS WHERE ID_PROJECT = @ID_PROJECT `,
                    inputs: [
                        { key: 'ID_PROJECT', type: dbMSSQL.Int, value: params.id_project }
                    ]
                }); 
                if( getData.length !==0){
                    const newOrder = await dbMSSQL.query({
                        sql: `SELECT TOP (1) [ORDER] - 1 AS [ORDER]
                        FROM [HEFESTO].[dbo].[TBA_STATUS] ORDER BY [ORDER] ASC`
                    }); 
                    order = newOrder[0].ORDER
                }
            }



                const sql = await dbMSSQL.update({
                    sql: `
                INSERT INTO TBA_STATUS
                (   
                    [STATUS]
                    ,[SLA]
                    ,[ORDER]
                    ,[ID_PROJECT]
                )
                VALUES
                (   
                    @STATUS
                    ,@SLA
                    ,@ORDER
                    ,@ID_PROJECT
                )`,
                    inputs: [
                        { key: 'STATUS', type: dbMSSQL.Varchar, value: params.status },
                        { key: 'SLA', type: dbMSSQL.Int, value: params.sla },
                        { key: 'ORDER', type: dbMSSQL.Decimal, value: order },
                        { key: 'ID_PROJECT', type: dbMSSQL.Int, value: params.id_project },
                    ]
                });

                if(sql == 1){
                    return { insert: true }
                }else{
                    return { insert: false }
                }
            
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async insertSubstatus(params) {
        try {

                const sql = await dbMSSQL.update({
                    sql: `
                INSERT INTO TBA_SUBSTATUS
                (   
                    [SUBSTATUS]
                    ,[ID_STATUS]
                )
                VALUES
                (   
                    @SUBSTATUS
                    ,@ID_STATUS

                )`,
                    inputs: [
                        { key: 'SUBSTATUS', type: dbMSSQL.Varchar, value: params.substatus },
                        { key: 'ID_STATUS', type: dbMSSQL.Int, value: params.id_status },
                    ]
                });

                if(sql == 1){
                    return { insert: true }
                }else{
                    return { insert: false }
                }
            
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async insertClient(params) {
        try {

                const sql = await dbMSSQL.update({
                    sql: `
                    INSERT INTO TBF_CLIENTS
                    (   
                        [CLIENT]
                        ,[ID_STATUS]
                        ,[ID_SUBSTATUS]
                        ,[ENTRANCE]
                    )
                    VALUES
                    (   
                        @CLIENT
                        ,(SELECT TOP(1) ID FROM TBA_STATUS WHERE ID_PROJECT = @ID_PROJECT ORDER BY [ORDER])
                        ,0
                        ,CONVERT(date, CURRENT_TIMESTAMP)
    
                    )`,
                    inputs: [
                        { key: 'ID_PROJECT', type: dbMSSQL.Int, value: params.id_project },
                        { key: 'CLIENT', type: dbMSSQL.Varchar, value: params.client }
                    ]
                });

                if(sql == 1){
                    return { insert: true }
                }else{
                    return { insert: false }
                }
            
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

module.exports = new editHefesto();