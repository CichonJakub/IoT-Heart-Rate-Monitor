// server.js
const express = require('express');
const app = require('express')();
const utf8 = require('utf8');
const nacl = require('tweetnacl')
const utils = require('tweetnacl-util')
const encodeBase64 = utils.encodeBase64
const decodeBase64 = utils.decodeBase64
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

secretKey = 'BKg4kwwjXOe57iMhtBb2B3oakMP4z6xE'
secretKey = Buffer.from(secretKey, 'utf8')

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
    })
}

function update_content(category, table, what_to_change, change, user_id){
    let old_data = '';
    let new_data = '';
    let link = '';
    let queryString = "SELECT " + what_to_change + " FROM uzytkownicy WHERE id_uzytkownika = " + user_id + ";";
        client.query(queryString, (err, res) => {
            if( !err ){
                old_data = res.rows[0];
                console.log(res);
                queryString = "SELECT " + change + ", link FROM " + table + " WHERE " + change + " > " + old_data + " AND kategoria = " + category + " limit 1;";
                    client.query(queryString, (err, res) => {
                        if( !err ){
                            let tmpRow = res.rows[0];
                            let tmpData = [];
                            for (var key in tmpRow) {
                                console.log("Key: " + key);
                                console.log("Value: " + tmpRow[key]);
                                tmpData.push(tmpRow[key]);
                            }
                            new_data = tmpRow[0];
                            link = tmpRow[1];
                            //console.log(res.rows);
                            queryString = "UPDATE uzytkownicy SET " + what_to_change + " = " + new_data + " WHERE id_uzytkownika = " + user_id + ";";
                                client.query(queryString, (err, res) => {
                                    if( !err ){
                                        console.log(res);
                                    }
                                    else {
                                        console.log(err);
                                    }
                                })
                        }
                        else {
                            console.log(err);
                        }
                        return link;
                    })
            }
            else {
                console.log(err);
            }
        })
}

let socketHardware;
let users = [];

io.on('connection', function (socket) {

    console.log("CONNECTED");
    socket.on('hello', function(data){
        //let tmpId = 1;
        if( data == "webBrowser" ){
            tmpId = 666;
            users.push({id: tmpId, socket: socket});
            }
        //users.push({id: tmpId, socket: socket});
        console.log(data);
        socket.emit('ack', "TEST");
        console.log("HELLO RECEIVED");
    })

    socket.on('iAmHardware', function(data){
        socketHardware = socket;
        //users.push({id: 0, socket: socket});
    })

    socket.on("askForTest", function(data){
        console.log("askForTest: " + data);
        if ( socketHardware != null ){
                console.log("Relaying ask for test for " + data);
                socketHardware.emit("askForTest", data);
        }
    })

    socket.on("testMierzenie", function(data){
        console.log(data);
        data = JSON.parse(data);
        console.log(data.user);
        console.log(data.pomiar);
        console.log("connected sockets number: " + users.length);
        let index = users.findIndex(obj => obj.id == data.user);
        if( index != -1 ){
            users[index].socket.emit('testMierzenie', data.pomiar);
        }
        else{
            console.log("Something went wrong, this id is not connected");
        }
    })

    socket.on('register', function(data){
        console.log(data);
        console.log("Register " + data.login + " attempt.");
        let queryString = "INSERT INTO uzytkownicy(login, haslo) VALUES('" + data.login + "','" + data.password + "');";
        client.query(queryString, (err, res) => {
            if( !err ){
                console.log("Register success.");
                console.log(res.rows);
                socket.emit('confirmRegister', true);
            }else{
                console.log("Register failed.");
                console.log(err);
                socket.emit('confirmRegister', false);
            }
        })
    });

    socket.on('login', function(data){
        console.log(data);

        let queryString = "SELECT * from uzytkownicy WHERE login='" + data.login + "';";
        client.query(queryString, (err, res) => {
            if( !err ){
                console.log(res.rowCount);
                if( res.rowCount > 0 ){
                    if( res.rows[0].haslo == data.password ){
                        console.log("Login successful: " + data.login);
                        let userdata = res.rows[0];
                        users.push({id: userdata.id_uzytkownika, login: data.login, socket: socket});
                        socket.emit('confirmLogin', "Test login id=" + data.login);
                    }
                    else{
                        console.log("Bad login data.");
                        socket.emit('confirmLogin', "BADLOGIN");
                    }
                    return;
                }
                else{
                    console.log("Unknown login: " + data.login);
                    socket.emit('confirmLogin', "BADLOGIN");
                    return;
                }
            }
            console.log(err);
            socket.emit('confirmLogin', "DATABASEERROR");
        })

        //users.push({id: data, socket: socket});
        //socket.emit('confirmLogin', "Test login id=" + data.login);
    });

    socket.on('requestPomiar', function(data){
        //console.log("askForTest: " + data);
        let index = users.findIndex(obj => obj.socket == socket);
        if( socketHardware == null ){
            console.log("NO DEVICE");
            socket.emit('pomiarResult2', {pomiar: "FAILEDTOMEASURE"});
        }
        else if( index == -1 ){
            console.log("USER ERROR");
            socket.emit('pomiarResult2', {pomiar: "FAILEDTOMEASURE"});
        }
        else{
            let userId = users[index].id;
            console.log("Relaying ask for test for " + userId);
            socketHardware.emit("requestPomiar2", userId);
        }
    });

    socket.on('pomiarResults', async function(data){

        // TUTAJ BĘDZIE WSTAWIANIE WYNIKU DO BAZY ORAZ
        // ALGORYTM DOBIERAJĄCY LINKI

        console.log("RESULTS IN:");
        console.log(data);
        data = JSON.parse(data);
        let encrypted = data.pomiar;
        let pomiar = "";

        nonce = encrypted.substring(0,32)
        nonce = decodeBase64(nonce)

        ciphertext = encrypted.substring(32)
        ciphertext = decodeBase64(ciphertext)

        decryption = nacl.secretbox.open(ciphertext, nonce, secretKey)
        pomiar = utils.encodeUTF8(decryption)

        console.log("POMIAR: ");
        console.log(pomiar);

        let queryString = "INSERT INTO pomiary(id_uzytkownika, wartosc) VALUES ("+data.id+","+pomiar+");";
        client.query(queryString, (err, res) => {
            if( !err ){
                console.log(res);
            }
            else {
                console.log(err);
            }
        })

        let porada = "", zdjecie = "", muzyka = "";

        if (data.pomiar > 100){
            porada = await update_content('1', 'porady', 'nr_rady_h', 'nr_rady', data.id);
            zdjecie = await update_content('1', 'zdjecia', 'nr_zdj_h', 'nr_zdj', data.id);
            muzyka = await update_content('1', 'muzyka', 'nr_muzyki_h', 'nr_muz', data.id);
        }
        else{
            porada = await update_content('0', 'porady', 'nr_rady_l', 'nr_rady', data.id);
            zdjecie = await update_content('0', 'zdjecia', 'nr_zdj_l', 'nr_zdj', data.id);
            muzyka = await update_content('0', 'muzyka', 'nr_muzyki_l', 'nr_muz', data.id);
        }

        let index = users.findIndex(obj => obj.id == data.user);
        if( index != -1 ){
            users[index].socket.emit('pomiarResult2', {pomiar: pomiar, porada: porada, zdjecie: zdjecie, muzyka: muzyka});
        }
    });


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
        })
    })

    socket.on('disconnect', function(data){
            console.log("Disconnect");
            if( socketHardware == socket ){
                socketHardware = null;
            }
            else{
                let index = users.findIndex(obj => obj.socket == socket);
                if( index != -1 ){
                    users.splice(index, 1);
                }
            }
        })

});
