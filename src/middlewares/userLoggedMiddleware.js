const user = require ('../models/user');

function userLoggedMiddleware (req, res, next){
    res.locals.isLogeed = false;

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = user.search("email", emailInCookie);



    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    if (req.session.userLogged){
        res.locals.isLogeed = true;
        res.locals.userLogged = req.session.userLogged;

    }

    next;

}


module.exports = userLoggedMiddleware;