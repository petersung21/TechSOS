var express = require('express');
var app = express();
var http = require('http');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var bodyParser = require('body-parser');
var Schema = mongoose.Schema;
var passport = require('passport');
var GooglePlusStrategy = require('passport-google-plus');
var googlepassport = require('passport-google').Strategy;
var google = require('googleapis');
var oauth2 = google.auth.OAuth2;

var scopes =[
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/gmail.compose'
];

passport.use(new GooglePlusStrategy({
        clientID = 'YOUR_CLIENT_ID',
        clientSecret = 'YOUR_CLIENT_SECRET'
    },
    function (tokens,profile,done){
        done(null,profile,tokens);
    }
))

var clientID = ;
var clientSecret = ;
var redirectlink = ;

passport.use(new GoogleStrategy({
    returnURL: 'http://www.example.com/auth/google/return',
    realm: 'http://www.example.com/'
  },
  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));
 
var fullInfo = new Schema ({
    datee: String,
    dropdown: String,
    selectedCustomer: String,
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
            console.log ("Error Dawgggg");
        }else {
            res.send (results);
        }
    });
});

app.get('/getEverything', function (req,res,next){
    ticketInvoice.find(function (err, results){
        if (err){
            console.log("Error Dawggg");
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
            res.send ("Something failed yoooo");
        }else {
            res.send("Check mongoDB duddeeee");
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
                console.log ("Something failed yooo");
            }else {
                res.send ("Check mongoDB dudeeee");
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
        