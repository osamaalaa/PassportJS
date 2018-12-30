const router = require('express').Router();
const passport = require('passport');




//auth login

router.get('/login', (req, res) => {
  res.render('login');

});


// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});



// google p2a

router.get('/google', passport.authenticate('google',{
  scope: ['profile']       // el scope dh hwa 27na 3ayzen eh mn el user fah el profile de y3ne el profile information
}));

// m7tagen el callback for google y3ne hn redirect fen p2a
// 27na hndef passport.authenticate('google') tane leh p2a ?  3l4an 2wl mrra 27na 4ofna el code fo2 fel URL .. hna5od el code p2a
// w ngep el profile information
// b3dha hyfire el hwa passport.authenticate el t7t de  .... el call back function el mwgoda fel passport-setup.js

router.get('/google/redirect',passport.authenticate('google'),(req ,res) => {
  // res.send('wslna kda ..... ');
  // res.send(req.user);
  res.redirect('/profile/');

});


module.exports = router;
