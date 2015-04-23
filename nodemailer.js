/*var passport = require('passport'),
    GoogleStrategy = require('./google_oauth2'),
    config = require('../config');

passport.use('google-imap', new GoogleStrategy({
  clientID: "1079143062001-i7r6t2lem1poi4v572llqdovhv84m4kf.apps.googleusercontent.com",
  clientSecret: "MTopiFvRiqFVE3QOSgi5RY6t")
}, function (accessToken, refreshToken, profile, done) {
  console.log(accessToken, refreshToken, profile);
  done(null, {
    access_token: accessToken,
    refresh_token: refreshToken,
    profile: profile
  });
}));

exports.mount = function (app) {
  app.get('/add-imap/:address?', function (req, res, next) {
    passport.authorize('google-imap', {
        scope: [
          'https://mail.google.com/',
          'https://www.googleapis.com/auth/userinfo.email'
        ],
        callbackURL: config('web.vhost') + '/add-imap',
        accessType: 'offline',
        approvalPrompt: 'force',
        loginHint: req.params.address
      })(req, res, function () {
        res.send(req.user);
      });
  });
};

passport.use(new GoogleStrategy({
    clientID: "1079143062001-i7r6t2lem1poi4v572llqdovhv84m4kf.apps.googleusercontent.com",
    clientSecret: "MTopiFvRiqFVE3QOSgi5RY6t",
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(refreshToken);
    var nodemailer = require("nodemailer");

    var generator = require('xoauth2').createXOAuth2Generator({
        user: "peterhyungroksung@gmail.com", // Your gmail address.

        clientId: "1079143062001-i7r6t2lem1poi4v572llqdovhv84m4kf.apps.googleusercontent.com",
        clientSecret: "MTopiFvRiqFVE3QOSgi5RY6t",
        refreshToken: refreshToken
    });



    // listen for token updates
    // you probably want to store these to a db
    generator.on('token', function(token){
        console.log('New token for %s: %s', token.user, token.accessToken);
    });


    // login
    var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: generator
        }
    });


    var mailOptions = {
        to: "petersung21@gmail.com",
        subject: 'Hello ',
        text: 'Hello world ',
        html: '<b>Hello world </b>'
    };


    smtpTransport.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: ' + info.response);
      }
      smtpTransport.close();
    });
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/gmail.compose' }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://www.google.ca');
  });*/

var nodemailer = require("nodemailer");

var generator = require('xoauth2').createXOAuth2Generator({
    user: "techSOSnotify@gmail.com", // Your gmail address.

    clientId: "1079143062001-i7r6t2lem1poi4v572llqdovhv84m4kf.apps.googleusercontent.com",
    clientSecret: "MTopiFvRiqFVE3QOSgi5RY6t",
    refreshToken: "1/_J5BVoX0jXj7ys2RaFDI1tqCwtrTQmnytdtikMi7KHY",
});



// listen for token updates
// you probably want to store these to a db
generator.on('token', function(token){
    console.log('New token for %s: %s', token.user, token.accessToken);
});


// login
var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: generator
    }
});


var mailOptions = {
    to: "peterhyungroksung@gmail.com",
    subject: 'Hello ',
    text: 'Hello world ',
    html: '<b>Hello world </b>'
};


smtpTransport.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Message sent: ' + info.response);
  }
  smtpTransport.close();
});