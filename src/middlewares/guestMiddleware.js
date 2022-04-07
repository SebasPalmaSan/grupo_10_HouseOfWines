function guestMiddleware (req,res,next){
    req.session && req.session.user  ? res.redirect('/users/profile'): next()
}
module.exports = guestMiddleware;