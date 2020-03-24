// server.js
const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { Client } = require('pg');
/*
const client = new Client({
  user: 'pulsometr',
  host: 'localhost',
  database: 'iot',
  password: 'Marcin',
  port: 5432,
})
*/

const port = process.env.PORT || 80;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
server.listen(port, function(){
    console.log(`App listening on port ${port}!`);
});

//var connectionString = 'postgres://postgres:postgres@localhost:5432/postgres';
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect(function(err) {
    if (err) {
        console.log(err);
    }
    else{
        init();
    }
});

function init(){
    client.query('SELECT * from test;', (err, res) => {
        if( !err ){
            console.log(res.rowCount);
            if( res.rowCount > 0 ){
                console.log(res.rows);
            }
        }else{
            console.log(err);
        }
        client.end();
    })
}

let socketHardware;
let users = [];

io.on('connection', function (socket) {

    users.push(socket);
    console.log("CONNECTED");
    socket.on('hello', function(data){
        console.log(data);
        socket.emit('ack', "TEST");
        console.log("HELLO RECEIVED");
    })

    socket.on('iAmHardware', function(data){
        socketHardware = socket;
    })

    socket.on("askForTest", function(data){
        if ( socketHardware != null ){
            let index = users.findIndex(obj => obj == socket);
            if( index != -1 )
                socketHardware.emit("askForTest", index);
        }
    })

    socket.on("testMierzenie", function(data){
        users[data.user].emit('testMierzenie', data.pomiar);
    })

    socket.on('database_porady', function(data){
        let valuesString = '';
        links = data.JSON_PARSE();
        for( i = 0; i < links.length; i++ ){
            valuesString += "('" + links[i].link + "')";
            if( i+1 < links.length )
                valuesString += ",";
            else
                valuesString += ";";
        }
        client.query('INSERT INTO porady(link) VALUES ' + valuesString, (err, res) => {
            if( !err ){
                console.log(res.rowCount);
                if( res.rowCount > 0 ){
                    console.log(res.rows);
                }
            }else{
                console.log(err);
            }
            client.end();
        })
    })

});
