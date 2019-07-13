var app = require('../app');
var path = require('path');
var http = require('http');
var https = require('https');
var httpolyglot = require('httpolyglot');
var fs = require('fs');
var conf = require('../config');
var logger = require('../app/util/LoggerUtil').logger('start');
let express = require('express');

var port = normalizePort(conf.app.port);
app.set('port', port);

var server;
if (conf.app.https.enable) { //HTTPS server
  var option = {
    key: fs.readFileSync(conf.app.https.key),
    cert: fs.readFileSync(conf.app.https.cert)
  };
  server = httpolyglot.createServer(option, function (req, res) {
    if (!req.socket.encrypted) {
      res.writeHead(301, {'Location': 'https://' + req.headers['host'] + req.url});
      res.end();
    } else {
      app.apply(app, arguments);
    }
  });
} else {// HTTP server
  server = http.createServer(app);
}

var isDev = process.env.NODE_ENV !== 'production';
app.locals.env = isDev ? 'development' : 'production';
app.locals.reload = isDev;
if (isDev) {
  var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.dev.config');
  var _webpack = webpack(webpackDevConfig);
  app.use(webpackDevMiddleware(_webpack, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(_webpack));
  var reload = require('reload');
  reload(server, app);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort (val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

/**
 * Event listener for HTTP or HTTPS server "error" event.
 */
function onError (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP or HTTPS server "listening" event.
 */
function onListening () {
  logger.info((conf.app.https.enable ? 'Https' : 'Http') + ' Server is ready. Port: [%d]', conf.app.port);
}
