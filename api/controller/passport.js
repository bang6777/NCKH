// const jwt = require('jsonwebtoken');
// const _ = require('lodash');
const bcrypt = require("bcryptjs");
const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'HeThongQuanLyChoMuonXeDap';

var TK_Model = require("../Model/taikhoan_Model");
// var TK_Ctr = require("../controller/taikhoan_Ctrl");



// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('payload received', jwt_payload);
  TK_Model.findOne({
    where: {
      TK_ID: jwt_payload.TK_ID,
      TK_QUYEN: "Người dùng"
    }
  }).then(tk_result => {
    // console.log('tk_result:'+ JSON.stringify(tk_result));
    if (tk_result && tk_result.TK_HIEULUC == 1) {
      console.log('User Not Found with username ');
      next(null, { TK_ID: tk_result.TK_ID });

    } else {
      next(null, false);
    }
  }).catch(err => {
    next(null, false);
  });

  // let TK_Model = getUser({ id: jwt_payload.id });
});

// lets create our strategy SESSION
let localStrategy = new LocalStrategy({
  usernameField: 'TK_ID',
  passwordField: 'TK_PASSWORD'
  // passReqToCallback: true
},
  function (TK_ID, password, done) {
    TK_ID = TK_ID.toUpperCase();
    TK_Model.findOne({
      where: {
        TK_ID: TK_ID,
        TK_QUYEN: "Quản trị"
      }
    }).then(user => {
      console.log(user);
      if (!user) {
        console.log('User Not found');
        return done(null, false, { message: 'Tài khoản không tồn tại' });
      }
      if (!bcrypt.compareSync(password, user.TK_PASSWORD)) {
        console.log('Invalid Password');
        return done(null, false,  { message: 'Sai mật khẩu'});
      }
      return done(null, user);
    }).catch(err => {
      if (err) { return done(err); }
    })
  });

// use the strategy

passport.serializeUser(function (user, done) {
  done(null, user.TK_ID);
});

passport.deserializeUser(function (TK_ID, done) {
  TK_ID = TK_ID.toUpperCase();
  TK_Model.findOne({
    where: {
      TK_ID: TK_ID,
      TK_QUYEN: "Quản trị"
    }
  }).then(user => {
    done(null, user);
  }).catch(err=>{
    done(err);
  })
});

passport.use(strategy);
passport.use(localStrategy);


module.exports.getPassport = () => { return passport };
module.exports.getSecretOrKey = () => { return jwtOptions.secretOrKey };