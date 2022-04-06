function authAdminMiddleware(req,res,next) {
    
    let userLogged = req.session != undefined && req.session.userLogged ? req.session.userLogged : null;

    return (!userLogged) ? res.redirect('/users/errorLogueado') : (userLogged.isAdmin == 1) ? next() : res.redirect('/');

}

module.exports = authAdminMiddleware;