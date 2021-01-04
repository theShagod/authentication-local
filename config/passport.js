var LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            User.findOne({where:{username: username}}).then(user => {
                if (!user) return done(null, false);//error, user, options
                //Match Password
                bcrypt.compare(password, user.password, (err, isMatch)=> {
                    if (err) throw err;
                    if (isMatch){
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                });
            }).catch(console.log)
        }
    ));
    
    /*
    //Copy and pasta below
    
    
    //generally serialize is a format of manipulating the data so that it can be stored
    //the user is serialized into the session 
    
    */
    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });
    //the user is deserialized by using the user obj as a key to get that data from the session cookie
    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });
    
}
