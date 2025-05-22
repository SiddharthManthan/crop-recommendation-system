const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // Check json web token exists and is verified
    if(token) {
            jwt.verify(token, process.env.JWTSECRET, (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/authentication/signin.html');
                return;
            } else {
                next();
            }
        });
    } else {
        res.redirect('/authentication/signin.html');
        return;
    }
}

// Check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                next();
            } else {
                // Todo: User Fix
                let user = await User.findById(decodedToken.id);
                //Todo: Pass data to view
                res.locals.user = user
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };