var express = require('express');
var app = express();
var http = require('http');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var bodyParser = require('body-parser');
var Schema = mongoose.Schema;
var passport = require('passport');
//var GooglePlusStrategy = require('passport-google-plus');
//var googlepassport = require('passport-google').Strategy;
var google = require('googleapis');
//var oauth2 = google.auth.OAuth2;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var nodemailer = require("nodemailer");


var fullInfo = new Schema ({
    datee: String,
    dropdown: String,
    selectedCustomer: String,
    selectedCustomermail:String,
    description: String,
});
 
var ticketinvoice = new Schema ({
    //title: {type:String, require: true},
    Assignee: {type:String, require: true},
    dateFrom: {type: Date, required: true},
    completeInfo: [fullInfo],
    modified: {type: Date, default: Date.now}
});
 
var ticketInvoice = mongoose.model('ticketI', ticketinvoice);
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
 
app.use (function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

mongoose.connect('mongodb://usethisnow:devsung1@ds047571.mongolab.com:47571/db_ticketing')
var db = mongoose.connection;
db.once('open', function(){

//https://arcane-refuge-1019.herokuapp.com
app.get('/getJSON/:id', function (req,res,next){
    ticketInvoice.findById(req.params.id,function (err, results){
        if (err){
            console.log ("Error");
        }else {
            res.send (results);
        }
    });
});

app.get('/getEverything', function (req,res,next){
    ticketInvoice.find(function (err, results){
        if (err){
            console.log("Error");
        }else {
            res.send(results);
        }
    });
});

app.post('/receiveJSON', function(req,res,next){
    var sendItem;
    sendItem = new ticketInvoice({
        Assignee: req.body.employee_info.Assignee,
        dateFrom: req.body.employee_info.dateFrom,
        completeInfo: req.body.items
    });
    sendItem.save(function (err){
        if (err){
            res.send ("Something failed");
        }else {
            var generator = require('xoauth2').createXOAuth2Generator({
                user: "techSOSnotify@gmail.com", // Your gmail address.

                clientId: "1079143062001-i7r6t2lem1poi4v572llqdovhv84m4kf.apps.googleusercontent.com",
                clientSecret: "MTopiFvRiqFVE3QOSgi5RY6t",
                refreshToken: "1/_J5BVoX0jXj7ys2RaFDI1tqCwtrTQmnytdtikMi7KHY",
            });



            // listen for token updates
            //generator.on('token', function(token){
            //    console.log('New token for %s: %s', token.user, token.accessToken);
            //});


            // login
            var smtpTransport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    xoauth2: generator
                }
            });

            for (var i=0;i<sendItem.completeInfo.length;i++){
                var mailOptions = {
                    to: sendItem.completeInfo[i].selectedCustomermail,
                    subject: 'Invoice Assigned By ' + sendItem.Assignee + ' on ' + sendItem.dateFrom,
                    text: 'Task: ' + sendItem.completeInfo[i].description + 'Due: ' + sendItem.completeInfo[i].datee,
                    html: '<p>'+ 'Task: ' + sendItem.completeInfo[i].description +'</p>'+
                          '<p>'+ 'Due: ' + sendItem.completeInfo[i].datee +'</p>'
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
            
            res.send("Check mongoDB");
        }
    });
});

app.put('/updateJSON/:id', function(req,res,next){
    ticketInvoice.findById(req.params.id, function(err, results){
        results.Assignee = req.body.employee_info.Assignee,
        results.dateFrom = req.body.employee_info.dateFrom,
        results.completeInfo = req.body.items
        results.save(function(err){
            if (err){
                console.log ("Something failed");
            }else {
                res.send ("Check mongoDB");
            }
        });
    });
});

app.delete('/deleteJSON/:id', function(req,res,next){
    ticketInvoice.findById(req.params.id, function(err,results){
        results.remove(function(err){
        if (err){
            res.send("Error bruhhhh");
        }else {
            res.send("Successfully Deleted bruhh");
        }
        });
    });
});
    
});

var port = process.env.PORT || 5000;
var server = http.createServer(app);
server.listen(port, function () {console.log("on port 5000")}); 
        
