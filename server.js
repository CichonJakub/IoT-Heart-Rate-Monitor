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

app.use('/scripts', express.static('scripts'));
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

    console.log("CONNECTED");
    socket.on('hello', function(data){
        let tmpId = 1;
        if( data == "webBrowser" )
            tmpId = 666;
        users.push({id: tmpId, socket: socket});
        console.log(data);
        socket.emit('ack', "TEST");
        console.log("HELLO RECEIVED");
    })

    socket.on('iAmHardware', function(data){
        socketHardware = socket;
        users.push({id: 0, socket: socket});
    })

    socket.on("askForTest", function(data){
        console.log("askForTest: " + data);
        if ( socketHardware != null ){
                console.log("Relaying ask for test for " + data ]);
                socketHardware.emit("askForTest", data);
        }
    })

    socket.on("testMierzenie", function(data){
        console.log(data);
        console.log("connected sockets number: " + users.length);
        let index = users.findIndex(obj => obj.id == data.user);
        if( index != -1 )
            users[index].socket.emit('testMierzenie', data.pomiar);
        else{
            console.log("Something went wrong, this id is not connected");
        }
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

    socket.on('disconnect', function(data){
            //console.log("Disconnect");
            let index = users.findIndex(obj => obj.socket == socket);
            if( index != -1 ){
                users.splice(index, 1);
            }
        })

});
