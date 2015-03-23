var express = require('express');
var app = express();
var http = require('http');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var bodyParser = require('body-parser');
var Schema = mongoose.Schema;
 
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
    fullInfo: {type: String, required: true},
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
    res.send (req.body);
    res.send (req.body.invoice);
    res.send (req.body.invoice.employee_info.Assignee);
    res.send (req.body.invoice.employee_info);
//    var sendItem;
//    sendItem = new ticketInvoice({
//        fullInfo: req.body.invoice,
//        Assignee: req.body.invoice.employee_info.Assignee,
//        dateFrom: req.body.invoice.employee_info.dateFrom,
//        completeInfo: req.body.items
//    });
//    sendItem.save(function (err){
//        if (err){
//            console.log ("Something failed yoooo");
//        }else {
//            res.send("Check mongoDB duddeeee");
//        }
//    });
//    res.send (sendItem);
});

app.put('/updateJSON/:id', function(req,res,next){
    ticketInvoice.findById(req.params.id, function(err, results){
        results.fullInfo = req.body.invoice,
        results.Assignee = req.body.invoice.employee_info.Assignee,
        results.dateFrom = req.body.invoice.employee_info.dateFrom,
        results.completeInfo = req.body.items
    });
    res.send (sendItem);
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
        