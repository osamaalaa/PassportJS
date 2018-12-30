const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user) {
      // htege lme ykon el user not logged in
      res.redirect('/auth/login');

    }else{
      next();

    }



};

router.get('/',authCheck,(req,res) =>{
  // res.send('You are Logged in this profile ' + req.user.username);
  res.render('profile', {user: req.user });
})

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;
