// server.js
const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const pg = require('pg');
/*
const client = new Client({
  user: 'pulsometr',
  host: 'localhost',
  database: 'iot',
  password: 'Marcin',
  port: 5432,
})
*/

const port = 80;

//app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
server.listen(port, function(){
    console.log(`App listening on port ${port}!`);
});

var connectionString = 'postgres://pulsometr:Marcin@localhost:5432/iot';

var client = new pg.Client(connectionString);
client.connect(function(err) {
    if (err) {
        console.log(err);
    }
    else{
        init();
    }
});

function init(){
    client.query('SELECT * from test', (err, res) => {
        if( !err ){
            console.log(res.rowCount);
            console.log(res.rows);
            if( res.rowCount > 0 ){
                console.log(res);
            }
        }else{
            console.log(err);
        }
        client.end();
    })
}
