const express = require('express')
const app = express();
const PORT = 5050;
const session = require('express-session');
const passport = require('passport');

//config passport
require("./config/passport")(passport)

//bodyparser
app.use(express.json());
app.use(express.urlencoded({extended: false}));



//session-express
app.use(session({
    secret:"keyboard cat",
    resave: true,
    saveUninitialized: true
}));
//passport
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/', require('./routes/html'))
app.use('/api', require('./routes/api'))

//static server
app.use('/',express.static('./public/'))
//order for routes and static server is important here. Routes runs first and then static page is set.
//If we use static first, routes has no control over paths that static controls.


//start server
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
})