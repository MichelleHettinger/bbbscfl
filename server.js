var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');

var app = express();
var PORT = process.env.PORT || 3002;

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

//Create handlebars view engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Serve static content for the app from the "public" directory in the application directory.
//Public directory becomes /static in html files
app.use('/static', express.static(__dirname + '/public'));

//app.use(express.static(__dirname + '/public'));
//Looks in public for static file to server
 

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


//ROUTES HERE
//Root (www.michellesnirvana.com or michellesnirvana.com)
app.get('/', function(req,res) {
  res.render('index');
});

app.get('/about', function(req,res) {
  res.render('about');
});

app.get('/events', function(req,res) {
  res.render('events');
});

app.get('/donate', function(req,res) {
  res.render('donate');
});

///
//List on port 3002 or heroku port and log it out
app.listen(PORT, function(){
  console.log('App listening on PORT ' + PORT);
})


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;