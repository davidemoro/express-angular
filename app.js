
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.VCAP_APP_PORT || 3000);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

if ('production' !== process.env.status) {
  // development only
  app.set('views', __dirname + '/app');
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
}
else {
  // production
  app.set('views', __dirname + '/dist');
  app.use(express.static(path.join(__dirname, 'dist')));
}

app.get('/', routes.index);

module.exports = app;

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
