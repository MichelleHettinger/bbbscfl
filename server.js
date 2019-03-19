const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const jwt = require('jsonwebtoken');
//const session = require('express-session');
const methodOverride = require('method-override');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer().listen(3000);
const app = express();
const port = process.env.PORT || 3001;
const publicPath = path.resolve(__dirname, './src/public');

app.set('jwtSecret', "CODINGROCKS");
//app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));
// Logging and public Path
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(express.static(publicPath));
app.use(methodOverride('_method')); // override with POST having ?_method=DELETE

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Expose-Headers', 'X-Pagination');
  next();
});

// Proxy all assets to webpack dev server
app.all('/src/assets/*', (req, res) => {
  proxy.web(req, res, {
    target: 'http://localhost:7777',
  });
});
 
// By placing the auth-routes before api-routes, 
// we stop users from going to any api sections
// if they haven't passed the threshold of auth-routes.
require('./src/controllers/html-routes.js')(app); 
require('./src/controllers/auth-routes.js')(app); 
require('./src/controllers/api-routes.js')(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
