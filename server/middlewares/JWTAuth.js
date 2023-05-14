const { expressjwt } = require('express-jwt');

const getTokenFromHeaders = (req) => {
  console.log(req.headers);
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};
let auth = {
  required: expressjwt({
    // @ts-ignore
    secret: process.env.JWT_SECRET,
    getToken: getTokenFromHeaders,
    algorithms: ['HS256'],
  }),
  optional: expressjwt({
    // @ts-ignore
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
    getToken: getTokenFromHeaders,
    algorithms: ['HS256'],
  }),
};

module.exports = auth;
