const app = require('express')();
const consign = require('consign');

consign({ cwd: __dirname, verbose: false })
    .include('./config/passport.js')
    .include('./config/middlewares.js')
    .include('./config/socket.js')
    .include('./utils')
    .include('./root')
    .then('./config/router.js')
    .into(app);

module.exports = app;