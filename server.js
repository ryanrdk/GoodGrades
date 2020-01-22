const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const sslRedirect = require('./src/authentication/heroku-ssl-redirect/');
var enforce = require('express-sslify');

// app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(enforce.HTTPS({ trustProtoHeader: true }));
// app.use(function(req, res, next) {
//   if (req.headers['x-forwarded-proto'] != 'https')
//     res.redirect(['https://', req.get('Host'), req.url].join(''));
//   else next();
// });
app.listen(port);
