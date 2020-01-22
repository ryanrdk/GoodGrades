const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const sslRedirect = require('heroku-ssl-redirect');

// app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(function(environments, status) {
  environments = environments || ['production'];
  status = status || 302;
  return function(req, res, next) {
    if (environments.indexOf(process.env.NODE_ENV) >= 0) {
      if (req.headers['x-forwarded-proto'] != 'https') {
        res.redirect(
          status,
          'https://' + req.hostname + req.originalUrl + '/login'
        );
      } else {
        next();
      }
    } else {
      next();
    }
  };
});
app.listen(port);
