const OkResponse = require('express-http-response/lib/http/OkResponse');
const passport = require('passport');
const User = require('../models/User');
const login = async (req, res, next) => {
  console.log(req.user);
  return next(new OkResponse(req.user.toAuthJSON(), 200, {}));
};

const context = async (req, res, next) => {
  console.log(req.auth.email);
  const user = await User.findOne({ email: req.auth.email });

  return next(new OkResponse(user.toAuthJSON(), 200, {}));
};
module.exports = {
  login,
  context,
};
