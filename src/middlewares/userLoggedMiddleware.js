//const user = require ('../models/user');
const db = require ('../database/models');

/*const userLoggedMiddleware = (req, res, next) => {
    db.User.findOne({ 
        where: {
            email: req.cookies && req.cookies.user ? req.cookies.user : null,
        }
    })
    .then(users =>{
        const userLogged = users;
        if(req.session && req.session.user){
            userLogged = req.session.user
        }

        res.locals.user = userLogged;

        next();
    })
    .catch(error => res.send(error))
}*/


const userLoggedMiddleware = (req, res, next) => {
    db.User.findOne({ 
        where: {
            email: req.cookies && req.cookies.user ? req.cookies.user : null,
        }
    })
    //.then(users =>{
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






