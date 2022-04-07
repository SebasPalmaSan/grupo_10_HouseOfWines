const authMiddleware = (req, res, next) =>{
    req.session && req.session.user && req.session.user ? next() : res.redirect('/users/login')
};

module.exports = authMiddleware;