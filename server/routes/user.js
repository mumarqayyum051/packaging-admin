const express = require('express');
const router = express.Router();
const { login, context } = require('../controllers/user');
const passport = require('../utilities/passport');
const auth = require('../middlewares/JWTAuth');
router.post('/login', passport.authenticate('local', { session: false }), login);
router.get('/me', auth.required, context);
module.exports = router;
