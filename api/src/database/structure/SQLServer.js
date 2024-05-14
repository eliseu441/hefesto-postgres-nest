const sql = require('mssql'); 
const BancoMetodos = require("./BancoMetodos"); 


module.exports = class SQLServerMapper extends BancoMetodos
{
    constructor(banco)
    {
        super();
        
        this.banco = banco;

        this.Int = sql.Int;
        this.Varchar = sql.VarChar;
        this.Boolean = sql.Bit;
        this.Decimal = sql.Decimal;
        this.DateTime = sql.DateTime;
        this.DateTime2 = sql.DateTime2;
    }

    async getPool()
    {
        return  await new sql.ConnectionPool(this.banco).connect();
       
        
    }

    async closePool(pool)
    {
        try {
            await pool.close();
        } catch (error) {
            console.log(error.stack);
        }
    }

    async query(param, pool)
    {
        try 
        {
            return await this.defaultExecute(param, pool, 1);

        } catch (error) {
            throw error;
        }
    }

    async update(param, pool)
    {
        try 
        {
            return await this.defaultExecute(param, pool, 2);

        } catch (error) {
            throw error;
        }
    }

    async defaultExecute(param, paramPool, metodo)
    {
        let retorno = undefined;
        let pool = undefined;
        let rs = undefined;
        try 
        {
            if (!param.transaction)
            {
                
                if (!paramPool) {
                    pool = await this.getPool();
                } else {
                    pool = paramPool;
                }
            }
            
            let request = undefined;

            if (param.transaction) {
                request = await param.transaction.request();
            } else {
                request = await pool.request();
            }

            if (param.inputs) {
                param.inputs.forEach(input => request.input(input.key, input.type, input.value));
            }
            rs = await request.query(param);
            

            if (metodo == 1) {
                retorno = rs.recordset;
            } else {
                retorno = rs.rowsAffected[0];
            }
            
            if (!param.transaction) 
            {
                if (!paramPool) this.closePool(pool);
            }
            
        } catch (error) {

            if (!param.transaction && error.name != "ConnectionError")
            {
                if (!paramPool) this.closePool(pool);
            }

            throw new Error(error.stack);
        }
        return retorno;
    }

}