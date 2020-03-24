socket = io();

socket.on('ack', function(data){
    console.log(data);
})

socket.on('testMierzenie', function(data){
    console.log("wyniki testu");
    console.log(data);
    let testWynik = document.getElementById('testWynik');
    testWynik.innerHTML = data;
})

window.onload=function(){
    socket.emit('hello', "webBrowser");

    document.getElementById('testMierzenie').addEventListener('click',function(){
        console.log("test mierzenia...");
        socket.emit('askForTest', "webBrowserTest");
    })
}
