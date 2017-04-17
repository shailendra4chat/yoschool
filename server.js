"use strict"; 

let express = require('express');
let app = express();
let port = process.env.PORT || 3000;
let path = require('path');
let morgan = require("morgan")
let cookieParser = require("cookie-parser")
let bodyParser = require('body-parser')
let session = require("express-session")
let passport = require("passport")
let flash = require("connect-flash")

let config  = require("./server/config/config")

require("./server/auth/passport")(passport, config)

// MW
app.use(morgan("dev"))
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: "yoschool",
	saveUninitialized: true,
	resave: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//View Engine
app.set('views', path.join(__dirname, 'clinet'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

let index = require('./server/routes/index');
app.use('/', index);

let users = express.Router();
require('./server/routes/users')(users, passport, config);
app.use('/api', users);

app.listen(port, function(){
    console.log('Server started on port '+port);
});