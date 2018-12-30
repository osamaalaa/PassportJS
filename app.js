// passport.js dh authentication middleware
// hwa set of strategies support authentication for (username and password) and twitter and facebook
// --------------------- node server --------------------------------------
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

// const mongoose = require('mongoose');

const keys = require('./config/keys');


const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const app = express();

const passportSetup = require('./config/passport-setup');
// set view engine
app.set('view engine' ,'ejs');

const cookieSession = require('cookie-session');

const passport = require('passport');


// 2wl mangeb el user id mn serialize hnege el cookieSession el hya el t7t de n encrypt w b3den hn send lel browser wel browser hy recieve that cookie
app.use(cookieSession({
  maxAge: 24 * 60 * 60  * 1000,
  keys: [keys.session.cookieKey]



}));




// passport initiaze

app.use(passport.initialize());
app.use(passport.session());



// connect to mongodb

mongoose.connect(keys.mongodb.dbURI,() =>{
  console.log('connected to DB ....');
})





app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});



app.listen(3000, ()=>{
  console.log('Working....');
})
