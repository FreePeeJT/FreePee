"use strict";

const router = require('express').Router();
const passport = require('passport');

/**
 * Google authentication
 */
router.route('/google')
    .get(passport.authenticate('google', {
            prompt: 'select_account', //Ensure the user can always select an account when sent to Google.
            scope: ['email', 'profile']
        })
    );
router.route('/google/callback')
    .get(passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/auth/failure'
        })
    );


/**
 * Authentication failure
 */
router.get("/failure", function (req, res) {
    res.render('error', {
        title: "Login failure",
        errorMsg: "For your information: \nWe only allow accounts from the howest.be domain."
    });
});

module.exports = router;