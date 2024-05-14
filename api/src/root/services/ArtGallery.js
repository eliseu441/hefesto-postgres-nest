//----------const dbFIBRA = require('../bds/FIBRA');
const dbFIBRA = require('../../database/sqlserver');
const IntlBr = require('intl');
const excel = require('exceljs');
'use strict';
const { networkInterfaces } = require('os');

const ValidationError = require('../../errors/ValidationError');
class ArtGallery {

    constructor() {

    }
    async getBioArtists(params) {
        try {

            let page = 0
            if (params.page) {
                page = parseInt(params.page) * 3
            }

            const sql = await dbFIBRA.query(`
            SELECT [ID]
            ,[NAME]
            ,[NACIONALITY]
            ,[BORN]
            ,[DEATH]
            ,[BIO]
            ,[ICON]
        FROM [ART_GALLERY].[dbo].[TBF_ARTISTS] ORDER BY ID OFFSET ${page} ROWS FETCH NEXT 3 ROWS ONLY
          
            `);
            return sql
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getBioArtists2(params) {
        try {

            
            const sql = await dbFIBRA.query(`
            INSERT INTO [ART_GALLERY].[dbo].[TBF_ARTISTS2]
            ( 
             [NAME]
            )
            VALUES
            (
             '${params.ad}'
            )
          
            `);
            return console.log({ response: 'ok' })


        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getTypesDesc(params) {
        try {
            const sql = await dbFIBRA.query(`
            SELECT  [ID]
            ,[TYPE]
            ,[TYPE_DESCRIPTION]
        FROM [ART_GALLERY].[dbo].[TBF_TYPES]
            `);
            return sql
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getAllArts(params) {
        try {
            let id_artitst = params.id ? parseInt(params.id) : 1
            let where = { conditions: [], inputs: [] };

            where.conditions.push(`AND A.ID_ARTIST = ${id_artitst}`)
            where.inputs.push({ key: 'ID_ARTIST', type: dbFIBRA.Int, value: 1 })


            const res = await dbFIBRA.query(`
                SELECT TOP(7)
                CAST (ROW_NUMBER() OVER (ORDER BY A.PAINT_NAME  ) AS INT) AS ID_INDEX
                ,B.NAME
                ,A.ID_ARTIST
                ,A.PAINT_NAME
                ,A.YEAR
                ,A.FILE_NAME
                FROM [ART_GALLERY].[dbo].[TBF_RELATION_ART_ARTISTS] A
                INNER JOIN TBF_ARTISTS  B ON  A.ID_ARTIST = B.ID
                WHERE 1=1 ${where.conditions.join(' ')}

                ORDER BY ID_INDEX DESC
            `);
            return res
        } catch (error) {
            console.error(error);
            throw error;
        }
    }




    async getSculpCarousel(params) {
        try {
            let id_artitst = params.id ? parseInt(params.id) : 10
            let where = { conditions: [], inputs: [] };

            where.conditions.push(`AND A.ID_ARTIST = ${id_artitst}`)
            where.inputs.push({ key: 'ID_ARTIST', type: dbFIBRA.Int, value: 10 })


            const res = await dbFIBRA.query(`
            SELECT 
            CAST (ROW_NUMBER() OVER (ORDER BY A.SCULPTURE  ) AS INT) AS ID_INDEX
            ,B.NAME
            ,A.ID_ARTIST
            ,A.SCULPTURE
            ,A.YEAR
            ,A.FILE_NAME
            FROM [ART_GALLERY].[dbo].[TBF_RELATION_SCULPTURE_ARTISTS] A
            INNER JOIN TBF_ARTISTS  B ON  A.ID_ARTIST = B.ID
                WHERE 1=1 ${where.conditions.join(' ')}

                ORDER BY ID_INDEX ASC
            `);
            return res
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getPaintersCombo(params) {
        try {
            const sql = await dbFIBRA.query(`
            SELECT DISTINCT A.ID
            ,NAME
            FROM [ART_GALLERY].[dbo].[TBF_ARTISTS] AS A 
            INNER JOIN TBF_RELATION_ART_ARTISTS AS B ON A.ID = B.ID_ARTIST
            `);
            return sql
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getSculptorsCombo(params) {
        try {
            const sql = await dbFIBRA.query(`
            
                
            SELECT DISTINCT A.ID
            ,NAME
            FROM [ART_GALLERY].[dbo].[TBF_ARTISTS] AS A 
            INNER JOIN TBF_RELATION_SCULPTURE_ARTISTS AS B ON A.ID = B.ID_ARTIST
          
            `);
            return sql
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getBuildTable(params) {
        try {
            const sql = await dbFIBRA.query(`
            SELECT  
            [ID]
          ,[BUILD]
          ,[COUNTRY]
          ,[YEAR]
      FROM [ART_GALLERY].[dbo].[TBF_BUILDINGS]
            `);
            return sql
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getBuildContent(params) {
        try {
            console.log(params)
            if (!params.id_build) {

                let erro = new Error('build_id not found or database reference is empty.');
                erro.status = 500
                throw erro

            }

            const images = await dbFIBRA.query(`
            SELECT

            B.ID
          ,B.BUILD
          ,B.COUNTRY
          ,B.YEAR
          ,CONCAT( B.FILE_NAME , A.FILE_NAME ) AS PATH_NAME
  
      FROM [ART_GALLERY].[dbo].[TBF_RELATION_IMG_BUILDINGS] AS A
      INNER JOIN TBF_BUILDINGS B ON A.ID_BUILD = B.ID
      WHERE A.ID_BUILD = ${parseInt(params.id_build)}
          
            `);
            const descriptions = await dbFIBRA.query(`
            SELECT TOP (1) 
            [ID]
            ,CONCAT( BUILD , '-', COUNTRY ) AS TITLE
            ,[DESCRIPTION]
        FROM [ART_GALLERY].[dbo].[TBF_BUILDINGS] WHERE ID = ${parseInt(params.id_build)}
          
            `);

            return { images, descriptions }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getInventors(params) {
        try {
            const sql = await dbFIBRA.query(`
            SELECT
             [ID]
            ,[NAME]
            ,CONCAT ( [INVENTION] , ' - ',[INVENTION_YEAR],' - ' ,[INVENTION_DESCRIPTION]) AS DESCRIPTION
            ,[FILE_NAME]
            FROM [ART_GALLERY].[dbo].[TBF_INVENTORS] ORDER BY ID ASC
            `);
            return sql
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getEpochChoices(params) {
        try {

            /*
                        query para buildings caso precisar
            
            
                        const sql = await dbFIBRA.query(`
                        SELECT  CASE WHEN EXISTS  (
                            SELECT  * 
                           FROM (SELECT
                             [ID]
                               ,[BUILD]
                               ,[COUNTRY]
                               ,[YEAR]
                               ,[FILE_NAME]
                               ,[DESCRIPTION]
                           FROM [ART_GALLERY].[dbo].[TBF_BUILDINGS] 
                           WHERE YEAR  LIKE 'BC%' ) AS A 
                           
                         ) 
                         THEN CAST(1 AS BIT) 
                         ELSE CAST(0 AS BIT) 
                         END AS BC_BUILDINGS,
                         (SELECT  CASE WHEN EXISTS  (
                            SELECT  * 
                           FROM (SELECT
                             [ID]
                               ,[BUILD]
                               ,[COUNTRY]
                               ,[YEAR]
                               ,[FILE_NAME]
                               ,[DESCRIPTION]
                           FROM [ART_GALLERY].[dbo].[TBF_BUILDINGS] 
                           WHERE YEAR NOT LIKE 'BC%' ) AS A 
                           WHERE A.YEAR BETWEEN 0 AND 100 
                         ) 
                         THEN CAST(1 AS BIT) 
                         ELSE CAST(0 AS BIT) 
                         END) AS I_BUILDINGS,
                         (SELECT  CASE WHEN EXISTS  (
                            SELECT  * 
                           FROM (SELECT
                             [ID]
                               ,[BUILD]
                               ,[COUNTRY]
                               ,[YEAR]
                               ,[FILE_NAME]
                               ,[DESCRIPTION]
                           FROM [ART_GALLERY].[dbo].[TBF_BUILDINGS] 
                           WHERE YEAR NOT LIKE 'BC%' ) AS A 
                           WHERE A.YEAR BETWEEN 1200 AND 1299 
                         ) 
                         THEN CAST(1 AS BIT) 
                         ELSE CAST(0 AS BIT) 
                         END) AS XIII_BUILDINGS,
                         (SELECT  CASE WHEN EXISTS  (
                            SELECT  * 
                           FROM (SELECT
                             [ID]
                               ,[BUILD]
                               ,[COUNTRY]
                               ,[YEAR]
                               ,[FILE_NAME]
                               ,[DESCRIPTION]
                           FROM [ART_GALLERY].[dbo].[TBF_BUILDINGS] 
                           WHERE YEAR NOT LIKE 'BC%' ) AS A 
                           WHERE A.YEAR BETWEEN 1300 AND 1399
                         ) 
                         THEN CAST(1 AS BIT) 
                         ELSE CAST(0 AS BIT) 
                         END) AS XIV_BUILDINGS,
                         (SELECT  CASE WHEN EXISTS  (
                            SELECT  * 
                           FROM (SELECT
                             [ID]
                               ,[BUILD]
                               ,[COUNTRY]
                               ,[YEAR]
                               ,[FILE_NAME]
                               ,[DESCRIPTION]
                           FROM [ART_GALLERY].[dbo].[TBF_BUILDINGS] 
                           WHERE YEAR NOT LIKE 'BC%' ) AS A 
                           WHERE A.YEAR BETWEEN 1400 AND 1499
                         ) 
                         THEN CAST(1 AS BIT) 
                         ELSE CAST(0 AS BIT) 
                         END) AS XV_BUILDINGS,
                         (SELECT  CASE WHEN EXISTS  (
                            SELECT  * 
                           FROM (SELECT
                             [ID]
                               ,[BUILD]
                               ,[COUNTRY]
                               ,[YEAR]
                               ,[FILE_NAME]
                               ,[DESCRIPTION]
                           FROM [ART_GALLERY].[dbo].[TBF_BUILDINGS] 
                           WHERE YEAR NOT LIKE 'BC%' ) AS A 
                           WHERE A.YEAR BETWEEN 1500 AND 1599
                         ) 
                         THEN CAST(1 AS BIT) 
                         ELSE CAST(0 AS BIT) 
                         END) AS XVI_BUILDINGS,
                         (SELECT  CASE WHEN EXISTS  (
                            SELECT  * 
                           FROM (SELECT
                             [ID]
                               ,[BUILD]
                               ,[COUNTRY]
                               ,[YEAR]
                               ,[FILE_NAME]
                               ,[DESCRIPTION]
                           FROM [ART_GALLERY].[dbo].[TBF_BUILDINGS] 
                           WHERE YEAR NOT LIKE 'BC%' ) AS A 
                           WHERE A.YEAR BETWEEN 1600 AND 1699
                         ) 
                         THEN CAST(1 AS BIT) 
                         ELSE CAST(0 AS BIT) 
                         END) AS XVII_BUILDINGS,
                         (SELECT  CASE WHEN EXISTS  (
                            SELECT  * 
                           FROM (SELECT
                             [ID]
                               ,[BUILD]
                               ,[COUNTRY]
                               ,[YEAR]
                               ,[FILE_NAME]
                               ,[DESCRIPTION]
                           FROM [ART_GALLERY].[dbo].[TBF_BUILDINGS] 
                           WHERE YEAR NOT LIKE 'BC%' ) AS A 
                           WHERE A.YEAR BETWEEN 1700 AND 1799
                         ) 
                         THEN CAST(1 AS BIT) 
                         ELSE CAST(0 AS BIT) 
                         END) AS XVIII_BUILDINGS,
                         (SELECT  CASE WHEN EXISTS  (
                            SELECT  * 
                           FROM (SELECT
                             [ID]
                               ,[BUILD]
                               ,[COUNTRY]
                               ,[YEAR]
                               ,[FILE_NAME]
                               ,[DESCRIPTION]
                           FROM [ART_GALLERY].[dbo].[TBF_BUILDINGS] 
                           WHERE YEAR NOT LIKE 'BC%' ) AS A 
                           WHERE A.YEAR BETWEEN 1800 AND 1899
                         ) 
                         THEN CAST(1 AS BIT) 
                         ELSE CAST(0 AS BIT) 
                         END) AS XIX_BUILDINGS
                        `);
                        */
            const paints = await dbFIBRA.query(`
            
            SELECT  CASE WHEN EXISTS  (
                SELECT ID FROM [ART_GALLERY].[dbo].[TBF_RELATION_ART_ARTISTS] WHERE YEAR BETWEEN 1200 AND 1299
                ) 
                THEN CAST(1 AS BIT) 
                ELSE CAST(0 AS BIT) 
                END AS XIII_PAINT,
                (SELECT  CASE WHEN EXISTS  (
                SELECT ID FROM [ART_GALLERY].[dbo].[TBF_RELATION_ART_ARTISTS] WHERE YEAR BETWEEN 1300 AND 1399
                ) 
                THEN CAST(1 AS BIT) 
                ELSE CAST(0 AS BIT) 
                END) AS XIV_PAINT,
                (SELECT  CASE WHEN EXISTS  (
                SELECT ID FROM [ART_GALLERY].[dbo].[TBF_RELATION_ART_ARTISTS] WHERE YEAR BETWEEN 1400 AND 1499
                ) 
                THEN CAST(1 AS BIT)  
                ELSE CAST(0 AS BIT) 
                END) AS XV_PAINT,
                (SELECT  CASE WHEN EXISTS  (
                SELECT ID FROM [ART_GALLERY].[dbo].[TBF_RELATION_ART_ARTISTS] WHERE YEAR BETWEEN 1500 AND 1599
                ) 
                THEN CAST(1 AS BIT)  
                ELSE CAST(0 AS BIT) 
                END) AS XVI_PAINT,
                (SELECT  CASE WHEN EXISTS  (
                SELECT ID FROM [ART_GALLERY].[dbo].[TBF_RELATION_ART_ARTISTS] WHERE YEAR BETWEEN 1600 AND 1699
                ) 
                THEN CAST(1 AS BIT)  
                ELSE CAST(0 AS BIT) 
                END) AS XVII_PAINT,
                (SELECT  CASE WHEN EXISTS  (
                SELECT ID FROM [ART_GALLERY].[dbo].[TBF_RELATION_ART_ARTISTS] WHERE YEAR BETWEEN 1700 AND 1799
                ) 
                THEN CAST(1 AS BIT)  
                ELSE CAST(0 AS BIT) 
                END) AS XVIII_PAINT,
                (SELECT  CASE WHEN EXISTS  (
                SELECT ID FROM [ART_GALLERY].[dbo].[TBF_RELATION_ART_ARTISTS] WHERE YEAR BETWEEN 1800 AND 1899
                ) 
                THEN CAST(1 AS BIT)  
                ELSE CAST(0 AS BIT) 
            END) AS XIX_PAINT    
            `);
            const sculps = await dbFIBRA.query(`
            SELECT  CASE WHEN EXISTS  (
                SELECT ID FROM [ART_GALLERY].[dbo].[TBF_RELATION_SCULPTURE_ARTISTS] WHERE YEAR BETWEEN 1200 AND 1299
                ) 
                THEN CAST(1 AS BIT)     
                ELSE CAST(0 AS BIT) 
                END AS XIII_SCULP,
                (SELECT  CASE WHEN EXISTS  (
                SELECT ID FROM [ART_GALLERY].[dbo].[TBF_RELATION_SCULPTURE_ARTISTS] WHERE YEAR BETWEEN 1300 AND 1399
                ) 
                THEN CAST(1 AS BIT)     
                ELSE CAST(0 AS BIT) 
                END) AS XIV_SCULP,
                (SELECT  CASE WHEN EXISTS  (
                SELECT ID FROM [ART_GALLERY].[dbo].[TBF_RELATION_SCULPTURE_ARTISTS] WHERE YEAR BETWEEN 1400 AND 1499
                ) 
                THEN CAST(1 AS BIT)     
                ELSE CAST(0 AS BIT) 
                END) AS XV_SCULP,
                (SELECT  CASE WHEN EXISTS  (
                SELECT ID FROM [ART_GALLERY].[dbo].[TBF_RELATION_SCULPTURE_ARTISTS] WHERE YEAR BETWEEN 1500 AND 1599
                ) 
                THEN CAST(1 AS BIT)     
                ELSE CAST(0 AS BIT) 
                END) AS XVI_SCULP,
                (SELECT  CASE WHEN EXISTS  (
                SELECT ID FROM [ART_GALLERY].[dbo].[TBF_RELATION_SCULPTURE_ARTISTS] WHERE YEAR BETWEEN 1600 AND 1699
                ) 
                THEN CAST(1 AS BIT)     
                ELSE CAST(0 AS BIT) 
                END) AS XVII_SCULP,
                (SELECT  CASE WHEN EXISTS  (
                SELECT ID FROM [ART_GALLERY].[dbo].[TBF_RELATION_SCULPTURE_ARTISTS] WHERE YEAR BETWEEN 1700 AND 1799
                ) 
                THEN CAST(1 AS BIT)     
                ELSE CAST(0 AS BIT) 
                END) AS XVIII_SCULP,
                (SELECT  CASE WHEN EXISTS  (
                SELECT ID FROM [ART_GALLERY].[dbo].[TBF_RELATION_SCULPTURE_ARTISTS] WHERE YEAR BETWEEN 1800 AND 1899
                ) 
                THEN CAST(1 AS BIT)     
                ELSE CAST(0 AS BIT) 
            END) AS XIX_SCULP
            `);

            return [{ paints, sculps }]
        } catch (error) {
            console.error(error);
            throw error;
        }
    }




    async getImagesCentury(params) {
        try {
            let where = ''
            if (params.century == 'XIII') {
                where = 'WHERE YEAR BETWEEN 1200 AND 1299'
            }
            else if (params.century == 'XIV') {
                where = 'WHERE YEAR BETWEEN 1300 AND 1399'
            }
            else if (params.century == 'XV') {
                where = 'WHERE YEAR BETWEEN 1400 AND 1499'
            }
            else if (params.century == 'XVI') {
                where = 'WHERE YEAR BETWEEN 1500 AND 1599'
            }
            else if (params.century == 'XVII') {
                where = 'WHERE YEAR BETWEEN 1600 AND 1699'
            }
            else if (params.century == 'XVIII') {
                where = 'WHERE YEAR BETWEEN 1700 AND 1799'
            }
            else if (params.century == 'XIX') {
                where = 'WHERE YEAR BETWEEN 1800 AND 1899'
            } else {

                let erro = new Error('century parameter invalid');
                erro.status = 500
                throw erro
            }

            if (params.type == 1) {
                const sql = await dbFIBRA.query(`
            SELECT TOP (100) [ID]
            ,[ID_ARTIST]
            ,[SCULPTURE]
            ,[YEAR]
            ,[FILE_NAME]
        FROM [ART_GALLERY].[dbo].[TBF_RELATION_SCULPTURE_ARTISTS] ${where} ORDER BY ID_ARTIST
            `);
                return sql

            } else if (params.type == 2) {
                const sql = await dbFIBRA.query(`
                SELECT TOP (100) [ID]
                ,[ID_ARTIST]
                ,[PAINT_NAME]
                ,[YEAR]
                ,[FILE_NAME]
            FROM [ART_GALLERY].[dbo].[TBF_RELATION_ART_ARTISTS] ${where} ORDER BY ID_ARTIST
                `);
                return sql

            } else if (params.type == 3) {
                const sql = await dbFIBRA.query(`
                SELECT
                    [BUILD]
                    ,[COUNTRY]
                    ,[YEAR]
                    ,CONCAT( A.FILE_NAME , B.FILE_NAME ) AS PATH_NAME
                    ,[DESCRIPTION]
                FROM [ART_GALLERY].[dbo].[TBF_BUILDINGS] AS A
                 RIGHT JOIN TBF_RELATION_IMG_BUILDINGS AS B ON A.ID = B.ID_BUILD
                 ${where} ORDER BY BUILD
       `);
                return sql
            } else {
                let erro = new Error('type parameter invalid');
                erro.status = 500
                throw erro

            }

        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getBCbuilds(params) {
        try {

            const sql = await dbFIBRA.query(`
            SELECT
            [BUILD]
            ,[COUNTRY]
            ,REPLACE([YEAR], '-', 'BC.') as YEAR
            ,CONCAT( A.FILE_NAME , B.FILE_NAME ) AS PATH_NAME
            ,[DESCRIPTION]
        FROM [ART_GALLERY].[dbo].[TBF_BUILDINGS] AS A
         RIGHT JOIN TBF_RELATION_IMG_BUILDINGS AS B ON A.ID = B.ID_BUILD
        WHERE YEAR < 0 ORDER BY BUILD
          
            `);
            return sql
        } catch (error) {
            console.error(error);
            throw error;
        }
    }




}

module.exports = new ArtGallery();