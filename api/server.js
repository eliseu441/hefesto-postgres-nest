const env_file = '.env' + (process.env.NODE_ENV != undefined ? `.${process.env.NODE_ENV}` : '');

const path = __dirname + '/' + env_file;

console.log('Carregando variaveis:', env_file);


require('dotenv').config({ path });

const express = require('express')

const app = require(__dirname + '/src/app')

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const APP_PATH = process.env.app_path ? process.env.app_path : ''

app.use(APP_PATH, express.static(__dirname + '/portal'))

//app.use(APP_PATH, express.static(process.env.DIR_STORAGE))

const PORT = process.env.PORT ? process.env.PORT : process.env.APP_PORT

app.set('port', PORT)

const server = app.listen(PORT, () => console.log(`Server listening on port ${ PORT }`))

const io = require('socket.io')(server, { path: '' + '/socket.io' })

app.set('io', io)

const { socket } = app.config
io.on('connection', client => {
    socket.onConnect(client, io)
});
