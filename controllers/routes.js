const passport = require('passport');

module.exports = function(app) {
    //Route login page
    app.get('/', function(req, res) {
        if (req.isAuthenticated()) {
            isLog = true;
        } else {
            isLog = false;
        }
        let logData = {
            logStatus: isLog
        };
        console.log('logData' + logData.logStatus);

        res.render('index', logData);
    });

    //Route account page
    app.get('/account', ensureAuthenticated, function(req, res) {
        let userId = req.user.id;
        let name = req.user.displayName;
        let emails = req.user.emails;
        let images = req.user.picture;

        let userData = {
            userId: userId,
            name: name
        };
        console.log(userId + ' ' + name + ' ' + emails + ' ' + '' + images);
        res.render('account', { userData });
    });

    app.get('/login', function(req, res) {
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
            successRedirect: '/',
            failureRedirect: '/login'
        }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login');
    }

};