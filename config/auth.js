module.exports = {
    isAuth: function (req, res, next){
        if (req.isAuthenticated()){
            return next();
        }
        return res.redirect('/')
    }
}

//use for where you want to block non users