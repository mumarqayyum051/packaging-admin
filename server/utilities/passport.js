let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let mongoose = require('mongoose');
const User = require('../models/User'); // Your User model
const { UnauthorizedResponse } = require('express-http-response');
const Strategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async function (email, password, next) {
    console.log(email, password);
    const user = await User.findOne({ email });

    if (!user) {
      return next(new UnauthorizedResponse('User does not exist with this email', 401, {}));
    }
    console.log(user);
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new UnauthorizedResponse('Password is incorrect', 401, {}));
    }
    if (!user.isActive) {
      return next(new UnauthorizedResponse('User is not active', 401, {}));
    }
    if (!user.isEmailVerified) {
      return next(new UnauthorizedResponse('User is not verified', 401, {}));
    }
    return next(null, user);
  }
);

passport.use(Strategy);

module.exports = passport;
