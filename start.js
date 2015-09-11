const express = require('express');
const app = express();
const fs = require('fs');
const process = require('child_process');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const colors = require('colors');

// webpack
var handleFataError = function(err) {
    console.log('fatal error: ', err);
}

var handleSoftErrors = function(errs) {
    errs.map(function(err) {
        console.log(err);
    });
}

var handleWarnings = function(warnings) {
    warnings.map(function(warning) {
        console.log(warning);
    });
}

var successfullyCompiled = function() {
    console.log('Your web was packed' .green);
}

var compiler = webpack(webpackConfig);

compiler.watch({
    poll: true
}, function(err, stats){

    if(err) {
        return handleFatalError(err);
    }

    var jsonStats = stats.toJson();

    if(jsonStats.errors.length > 0) {
        return handleSoftErrors(jsonStats.errors);
    }

    if(jsonStats.warnings.length > 0) {
        handleWarnings(jsonStats.warnings);
    }

    successfullyCompiled();
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
