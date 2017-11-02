var passport = require('passport');
var passportJWT = require('passport-jwt');
var _ = require('lodash');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var accounts = require('../services/users');

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = process.env.JWT_SECURE;

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);

  var account = accounts[_.findIndex(accounts, { id: jwt_payload.id })];
  if (account) {
    next(null, account);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

module.exports = {
  passport: passport,
  jwtOptions: jwtOptions
}