function authAdminMiddleware(req,res,next) {
    
    let userLogged = req.session != undefined && req.session.userLogged ? req.session.userLogged : null;

    return (!userLogged) ? res.redirect('/users/login') : (userLogged.isAdmin == 1) ? next() : res.redirect('/users/errorLogueado');

}

module.exports = authAdminMiddleware;