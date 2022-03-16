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
    .then(users =>{
    let userLogged = users;

    if (req.session && req.session.user){
        userLogged = req.session.user;
       
    }

    res.locals.user = userLogged;
    
    next();
})
.catch(error => res.send(error))
}
    
module.exports = userLoggedMiddleware




