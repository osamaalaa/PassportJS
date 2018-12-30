const passport = require('passport');
const GoogleStraegy = require('passport-google-oauth20');
const keys = require('./keys');

passport.serializeUser((user , done) =>{
  // null de error   y3ne b pass null 3l4an mfe4 error
  done(null, user.id); // grap mn el user el id


});

//-----------------------------------------------------------------------------
passport.deserializeUser((id , done) =>{  // npass el id w ngep el user
  // retrieve el id from a cookie
  User.findById(id).then((user) => {
    done(null, user);
  });
});



//-----------------------------------------------------------------------------

const User = require('../models/user-model');


passport.use(
  new GoogleStraegy({
  // el google strartegy bya5od el options
  callbackURL:'/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret

}, (accessToken,refreshToken, profile, done) => {

        // console.log('passport callback');
        // console.log(profile);
        // console.log(accessToken);
        // passport callback function

        // hn4of el user exists el 2wl wla ncreate new username


        User.findOne({googleId:profile.id }).then((currentUser) =>{
          if(currentUser){
            console.log('User is : ', currentUser);
            done(null ,currentUser);
          }else{
            new User({
              username: profile.displayName,
              googleId: profile.id

            }).save().then((newUser) => {
              console.log('new User Created' + newUser);
              done(null , newUser);
            });

          }

        })
  })

)



// serilize and deserialize : serialize hya 2n 27na na5od piece of information from database and n pass it to cookie
