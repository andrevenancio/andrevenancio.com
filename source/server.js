var express = require('express');
var app = express();

//serve static files as is
app.use(express.static(__dirname + '/'));

//setup the server
var server = app.listen(8081, function() {
    console.log('Listening on port %d', server.address().port);
});
