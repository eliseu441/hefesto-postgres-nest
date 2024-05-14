module.exports = {

    DATABASE: 
    {
        user: process.env.SQL_SERVER_USERNAME,
        password: process.env.SQL_SERVER_PASSWORD,
        server: process.env.SQL_SERVER_IP,
        port: Number(process.env.SQL_SERVER_PORT),
        instanceName: process.env.SQL_SERVER_INSTANCE,
        database: process.env.SQL_SERVER_DATABASE,
        connectionTimeout: 60000,
        requestTimeout: 240000,
        
        pool:{
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
            trustServerCertificate: true,
            //tdsVersion: '7_1',
            encrypt: true, // Use this if you're on Windows Azure 
            enableArithAbort: true,
        }
    },

}