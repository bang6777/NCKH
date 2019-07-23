var LocalStrategy = require('passport-local').Strategy;
var taikhoan_M = require('../Model/taikhoan_Model');
var passportJWT = require("passport-jwt");
var ExtractJWT = passportJWT.ExtractJwt;
var JWTStrategy = passportJWT.Strategy;

module.exports = function (passport) {

    passport.serializeUser(function (taikhoan_M, done) {
        done(null, taikhoan_M.TK_ID);
    });

    passport.deserializeUser(function (TK_ID, done) {
        taikhoan_M.findById(TK_ID, function (err, user) {
            done(err, user);
        });
    });


    passport.use(new LocalStrategy(function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
    ));

    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'your_jwt_secret'
    },
        function (jwtPayload, cb) {

            // User.findOne({ username: jwtPayload.username }, function (err, user) {
            //     if (err) { return done(err); }
            //     if (!user) {
            //         return done(null, false, { message: 'Incorrect username.' });
            //     }
            //     if (!user.validPassword(password)) {
            //         return done(null, false, { message: 'Incorrect password.' });
            //     }
            //     return done(null, user);
            // });
            //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
            return User.findOne({ username: jwtPayload.username })
                .then(user => {
                    return cb(null, { id: user._id, username: user.username });
                })
                .catch(err => {
                    return cb(err);
                });
        }
    ));
};

