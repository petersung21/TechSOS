var nodemailer = require("nodemailer");

var generator = require('xoauth2').createXOAuth2Generator({
    user: "peterhyungroksung@gmail.com", // Your gmail address.

    clientId: "1079143062001-i7r6t2lem1poi4v572llqdovhv84m4kf.apps.googleusercontent.com",
    clientSecret: "MTopiFvRiqFVE3QOSgi5RY6t",
    refreshToken: "1/r0GvWYPrQjVpJJtiYm1zfm7guqpUHwyCH14dXsAIgxE",
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
    from: "petersung21@gmail.com",
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