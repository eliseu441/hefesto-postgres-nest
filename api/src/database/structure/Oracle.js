const BancoMetodos = require("./BancoMetodos");

const oracledb = require('oracledb'); 
oracledb.initOracleClient({ libDir: 'C:/Oracle/Client_11' });

module.exports = class OracleMapper extends BancoMetodos
{
    constructor(banco)
    {
        super();

        this.banco = banco;

    }

    async getPool()
    {
        return await oracledb.getConnection(this.banco);
    }

    async query(param, pool)
    {
        let retorno = [];
        let recordset = [];
        
        try {
            if(!pool){
                this.pool = await oracledb.getConnection(this.banco);
            }else{
                this.pool = pool;
            }

            if(param.inputs){
                let inputs = {}
                param.inputs.forEach(input => {
                    inputs[input.key] = input.value;
                })
                recordset = await this.pool.execute(param.sql,inputs);
            }else{
                recordset = await this.pool.execute(param.sql);
            }

            recordset.rows.forEach((row, index) => {
                let linha = {};
                for (let i = 0; i < recordset.metaData.length; i++) {
                    linha[recordset.metaData[i].name] = row[i];
                }
                retorno.push(linha)
            });

            if(!pool){
                await this.pool.close()
            }
        } catch (error) {
            if(error.name != "ConnectionError"){
                if(!pool){
                    try {
                        await this.pool.close();
                    } catch (error) {
                        console.log(error.stack);
                    }
                }
            }
            throw new Error(error.stack);
        }

        return retorno;
    }

    async update(param,pool){

    }

}