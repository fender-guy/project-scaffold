const express = require('express');
const app = express();
const fs = require('fs');
const process = require('child_process');

// webpack
var ls = process.spawn('webpack', ['--colors', '--progress', '--watch', '-d']);

ls.stderr.on('error', function(error) {
    console.log('error: ', error);
});

ls.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

//ls.stderr.on('data', function (data) {
    //console.log('stderr: ' + data);
//});

ls.on('close', function (code) {
    console.log('child process exited with code ' + code);
});


// server
app.use(express.static('prod'));

app.get('/testGet', function (req, res) {
    res.send({testResponse : 'looks like the GET request worked'});
});

var server = app.listen(3031, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('App listening at http://%s:%s', host, port)

});
