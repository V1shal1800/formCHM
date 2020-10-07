const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const fromsPage = require('./routes/form'); 

// Load config
dotenv.config({path: './config/config.env'});

const app = express();

// Body Parser
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true}))  // to support URL-encoded bodies

// static folder  
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static('views/layouts'));
app.use(express.static('views/layouts.Images')); 

// check logging in development mode
if(process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}

// Handlebars 
app.engine('.hbs',exphbs({ defaultLayout: 'form' ,extname: '.hbs'}))
app.set('view engine','.hbs');

// Routes 
app.use('/',fromsPage);

module.exports = app;