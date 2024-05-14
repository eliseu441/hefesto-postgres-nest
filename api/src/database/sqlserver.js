const config = require('./config.js')
const SQLServerMapper = require('./structure/SQLServer');

class SQLServer extends SQLServerMapper
{
    constructor() 
    {
        super(config.DATABASE)
    }
}

module.exports = new SQLServer();