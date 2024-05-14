const config = require('./config.js');
const OracleMapper = require('./structure/Oracle.js');

class Oracle extends OracleMapper
{
    constructor() 
    {
        super(config.DATABASE_CONFIG_SIGITM)
    }
}

module.exports = new Oracle();