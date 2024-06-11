

const { map } = require('mssql');
const fs = require('fs');
const path = require('path');
const excelToJson = require('convert-excel-to-json');
const { Readable } = require("stream");
const readline = require("readline");
const multer = require("multer");

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
    async readFile(params, uploadedFiles) {
        try {
            if (!uploadedFiles){
                let erro = new Error('Nenhum arquivo foi enviado');
                erro.status = 500
                throw erro
            }

            const { file } = uploadedFiles;

            const files = [].concat(file);

            if (files.length === 0){
                let erro = new Error('Nenhum arquivo foi enviado');
                erro.status = 500
                return erro
            }

            let successUploadedFiles = [];

            for (const file of files) {
                console.log(file)
                await file.mv(`uploads/${file.name}`);
                let filepath = `uploads/${file.name}`;

                const sheetLines = excelToJson({
                    sourceFile: `uploads/${file.name}`,
                    columnToKey: {
                        A: 'name',
                        B: 'quantity',
                        C: 'price',
                        D: 'project'
                    },
                    header:{
                        // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
                        rows: 1 // 2, 3, 4, etc.
                    }
                    //sheets: ['sheet2']
                });
                fs.unlinkSync(`uploads/${file.name}`)
                 const service = await this.app.root.services.Editar.readFile(sheetLines.products, params)
                 if(service == 1) {
                    return {result:'ok'}
                 } else{
                    return {result:'error'}
                 }

                

                await file.mv(fullPath);

                successUploadedFiles.push({
                    ok: true,
                    message: 'Arquivo salvo com sucesso',
                    data: {
                        ...params,
                        file: {
                            name: fileName,
                            size: file.size,
                            ext: path.extname(file.name),
                        }
                    }
                });
                console.log(successUploadedFiles)
                console.log(fullPath)
                const result = await this.app.root.services.Massivas.teste(params, fullPath).then(e => {
                if(e == 1){
                     axios.post('http://suporte:11b3cb5579e126c00a6d800b41f2e8c803@10.129.145.193:8080/job/MASSIVAS%20NOVO%20FIBRA/build');
                     return {response: 'massiva enviada para a fila de processamento.'}
                    

                }else{
                    console.log(e)
                }
              })
               
            
            }
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = (app) => new editHefesto(app);

