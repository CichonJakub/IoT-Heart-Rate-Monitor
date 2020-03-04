// server.js
const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 80;

//app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
server.listen(port, function(){
    console.log(`App listening on port ${port}!`);
});
