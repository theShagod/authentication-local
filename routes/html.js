const express = require('express');
const router = express.Router();
const {isAuth} = require('../config/auth')
const path = require('path')
router.get('/members', isAuth ,(req, res) => {
    res.sendFile(path.join(__dirname, '../public/members.html'));
})

//prevents going back to urls when you are already login
function preventURL(url) {
    router.get(url, (req, res)=>{
        if (req.user){
            res.redirect('/members')
        } else {
            res.sendFile(path.join(__dirname, `../public/${url}`))
        }
    })
}
preventURL('/');
preventURL('/index.html');
preventURL('/signup.html');

module.exports = router;