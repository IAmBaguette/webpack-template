var express = require('express');

var app = express();

app.use('/bundle.js', express.static(__dirname + "/bin/bundle.js"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

require('http').Server(app).listen(3000, function () {
    console.log('listening on *:3000');
});