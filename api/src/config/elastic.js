// Add this to the VERY top of the first 
// file loaded in your app
var apm = require('elastic-apm-node').start({
    // Override service name from package.json
    // Allowed characters: a-z, A-Z, 0-9, -, _, 
    // and space
    serviceName: 'hefesto-api',

    // Use if APM Server requires a secret token
    // secretToken: 'kexdnsso6N6687MUqQ',
    secretToken: '',

    // Set the custom APM Server URL (default: http://localhost:8200)
    // serverUrl: 'https://7385334e00084d00a911ded2eeaa8745.apm.eastus2.azure.elastic-cloud.com:443',
    serverUrl: '',

    // distributedTracingOrigins: ['http://localhost:3000'],

    // Set the service environment
    environment: 'production'
});

module.exports = apm;