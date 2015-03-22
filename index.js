var express = require('express');
var app = express();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var bodyParser = require('body-parser');
var Schema = mongoose.Schema;


mongoose.connect('mongodb://phsung:Raptors12@ds047571.mongolab.com:47571/db_ticketing',function(err,db){
    if (err){
        console.log ("Connection Failed");
        throw err;
    }
});

var fullInfo = new Schema ({
    datee: String,
    dropdown: String,
    selectedCustomer: String,
    description: String,
});

var ticketinvoice = new Schema ({
    title: {type:String, require: true},
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
    next();
});
//https://arcane-refuge-1019.herokuapp.com
app.get('/getJSON/:id', function (req,res,next){
    return ticketInvoice.findById(req.params.id,function (err, results){
        if (err){
            return console.log ("Error Dawgggg");
        }else {
            return (results);
        }
    });    
});

app.get('/getEverything:', function (req,res,next){
    return ticketInvoice.find(function (err, results){
        if (err){
            return console.log ("Error Dawggg");
        }else {
            return (results);
        }
    });
});

app.post('/receiveJSON', function(req,res,next){
    var sendItem;
    sendItem = new ticketInvoice({
        fullInfo: req.body.invoice,
        Assignee: req.body.invoice.employee_info.Assignee,
        dateFrom: req.body.invoice.employee_info.dateFrom,
        completeInfo: [fullInfo]
    });
    sendItem.save(function (err){
        if (err){
            return console.log("Something failed yoooo");
        }else {
            return console.log("Check mongoDB duddeeee");
        }
    });
    return res.send (sendItem);
});

app.put('/updateJSON/:id', function(req,res,next){
    return ticketInvoice.findById(req.params.id, function(err, results){
        sendItem.fullInfo = req.body.invoice,
        sendItem.Assignee = req.body.invoice.employee_info.Assignee,
        sendItem.dateFrom = req.body.invoice.employee_info.dateFrom,
        sendItem.completeINfo = req.body.items
    });
    return res.send (sendItem);
});

app.delete('/deleteJSON/:id', function(req,res,next){
    return ticketInvoice.findById(req.params.id, function(err,results){
        return sendItem.remove(function(err){
            if (err){
                return console.log("Error bruhhhh");
            }else {
                return console.log("Successfully Deleted bruhh");
            }
        });
    });
});


