const passport = require('passport');
var Place2 = require("./../models/Place2.js");


module.exports = function(app) {

    //Route login page
    app.get('/', ensureAuthenticated, function(req, res, next) {
        res.redirect('login.html');
        console.log('Log Status: ' + logStatus.logStatus);
    });

    app.get('/dashboard', ensureAuthenticated, function(req, res, next) {
        if (req.isAuthenticated()) {
            isLog = true;
            logStatus = {
                logStatus: isLog
            };
            res.render('dashboard', logStatus);
        }
    });

    app.get('/favorite-places', ensureAuthenticated, function(req, res, next) {
        //res.render('favorite');
        Place2.find({}).exec(function(err, doc) {

            let pacData = {
                pac: doc
            }

            if (err) {
                console.log(err);
            } else {
                console.log(doc);
                res.render('my-packs', { pacData });

            }
        });
    });

    app.get('/my-pacs', ensureAuthenticated, function(req, res, next) {
        res.render('my-packs');
    });

    app.get('/dash', ensureAuthenticated, function(req, res, next) {
        res.redirect('dash.html');
    });

    //Route account page
    app.get('/account', ensureAuthenticated, function(req, res, next) {
        let userId = req.user;

        console.log(userId._json);
        console.log(userId._json.gender);
        var email = userId._json.emails.length;

        for (var i = 0; i < email; i++) {
            console.log('Email: ' + userId._json.emails[i].value);
        }
        let emails = 'test';
        let images = userId._json.image.url;
        let name = req.user.displayName;
        let fullName = userId._json.displayName;

        let userData = {
            userId: userId,
            name: fullName,
            email: emails,
            image: images
        };
        console.log('email: ' + userData.email);
        console.log('images: ' + images);

        console.log('obj:' + userData.image);
        res.render('account', { userData });
    });

    app.get('/login', ensureAuthenticated, function(req, res, next) {
        res.render('login', { user: req.user });
    });

    // GET /auth/google
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Google authentication will involve
    //   redirecting the user to google.com.  After authorization, Google
    //   will redirect the user back to this application at /auth/google/callback
    app.get('/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read'
        ]
    }));

    // GET /auth/google/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/dashboard',
            failureRedirect: '/'
        }));

    app.get('/logout', function(req, res, next) {
        req.logout();
        res.redirect('login.html');
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('login.html');
    }

};