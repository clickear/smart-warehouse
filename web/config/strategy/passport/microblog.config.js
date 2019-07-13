'use strict';

var MicroblogStrategy = require('passport-weibo').Strategy;

module.exports = new MicroblogStrategy({
    clientID: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_SECRET",
    callbackURL: "YOUR_WEB_SITE"
}, function (req, username, password, done) {
    // asynchronous verification
    process.nextTick(function () {
        // To keep the example simple, the user's Weibo profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Weibo account with a user record in your database,
        // and return that user instead.
        var user = {};
        user.id = profile.id;
        user.username = profile.displayName;
        user.password = refreshToken.access_token;
        return done(null, user);
    });
});