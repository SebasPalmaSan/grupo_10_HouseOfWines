const authAdminMiddleware = (req, res, next) => {
  req.session && req.session.user && req.session.user ? req.session.user.admin == 1? next() :res.redirect('/') : res.redirect('/users/login')
};

module.exports = authAdminMiddleware;