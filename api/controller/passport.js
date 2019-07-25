// const jwt = require('jsonwebtoken');
// const _ = require('lodash');

const passport = require('passport');
const passportJWT = require('passport-jwt');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'HeThongQuanLyChoMuonXeDap';

var TK_Model =  require("../Model/taikhoan_Model");


// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  TK_Model.findOne({
    where: {
      TK_ID: jwt_payload.TK_ID,
      TK_QUYEN: "Người dùng"
    }
  }).then(tk_result => {
    // console.log('tk_result:'+ JSON.stringify(tk_result));
    if(tk_result && tk_result.TK_HIEULUC == 1){
      next(null, tk_result);
    }else{
      next(null, false);
    }
   }).catch(err => {
    next(null, false);
  });

  // let TK_Model = getUser({ id: jwt_payload.id });
});
// use the strategy
passport.use(strategy);
module.exports.getPassport = () => {return passport};
module.exports.getSecretOrKey = () => {return jwtOptions.secretOrKey};