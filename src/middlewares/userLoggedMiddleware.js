const user = require ('../models/user');
const db = require ('../database/models');


function userLoggedMiddleware (req, res, next){
    res.locals.isLogeed = false;

    if (req.cookies && req.cookies.email) {
        let emailInCookie = req.cookies.email;
        let userFromCookie = user.search('email', emailInCookie);
        req.session.userLogged = userFromCookie;
    }

    if (req.session.userLogged){
        res.locals.isLogeed = true;
        res.locals.userLogged = req.session.userLogged;

    }

    next();

}


module.exports = userLoggedMiddleware;