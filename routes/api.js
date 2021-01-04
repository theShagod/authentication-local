const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require("passport");
const User = require('../models/User')


router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/members',
        failureRedirect: '/'
    })(req,res,next);
});

router.post('/signup', (req, res) => {
    User.create({username: req.body.username, password: req.body.password})
    res.redirect('/')
});

module.exports = router;