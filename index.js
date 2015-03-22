var express = require('express');
var app = express();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var bodyParser = require('body-parser');
var Schema = mongoose.Schema;
 
 
//mongoose.connect('mongodb://phsung:asd@ds047571.mongolab.com:47571/db_ticketing',function(err,db){
//    if (err){
//        res.send("Connection Failed");
//        throw err;
//    }
//});
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
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
 
mongoose.connect('mongodb://phsung:Raptors123@ds047571.mongolab.com:47571/db_ticketing');
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

    app.get('/getEverything:', function (req,res,next){
        ticketInvoice.find(function (err, results){
            if (err){
                console.log("Error Dawggg");
            }else {
                res.send(results);
            }
        });
    });

    app.post('/receiveJSON', function(req,res,next){
        mongoose.connect('mongodb://phsung:Raptors12@ds047571.mongolab.com:47571/db_ticketing',function(err,db){
        if (err){
            console.log("err");
        }else{
        var sendItem;
        sendItem = new ticketInvoice({
            fullInfo: req.body.invoice,
            Assignee: req.body.invoice.employee_info.Assignee,
            dateFrom: req.body.invoice.employee_info.dateFrom,
            completeInfo: [fullInfo]
        });
        sendItem.save(function (err){
            if (err){
                console.log ("Something failed yoooo");
            }else {
                res.send("Check mongoDB duddeeee");
            }
        });
        res.send (sendItem);
        }
        });
    });

    app.put('/updateJSON/:id', function(req,res,next){
        ticketInvoice.findById(req.params.id, function(err, results){
            sendItem.fullInfo = req.body.invoice,
            sendItem.Assignee = req.body.invoice.employee_info.Assignee,
            sendItem.dateFrom = req.body.invoice.employee_info.dateFrom,
            sendItem.completeINfo = req.body.items
        });
        res.send (sendItem);
    });

    app.delete('/deleteJSON/:id', function(req,res,next){
        return ticketInvoice.findById(req.params.id, function(err,results){
            return sendItem.remove(function(err){
                if (err){
                    console.log("Error bruhhhh");
                }else {
                    res.send("Successfully Deleted bruhh");
                }
            });
        });
    });
    
}); 
//mongoose.connect('mongodb://phsung:Raptors12@ds047571.mongolab.com:47571/db_ticketing',function(err,db){
//    if (err){
//        console.log ("Connection Failed");
//    } else{
//        return ticketInvoice.findById("550dbf3650caabe89162447b",function (err, results){
//            if (err){
//                console.log ("Error Dawgggg");
//            }else {
//                return console.log (results.completeInfo[0].datee);
//            }
//        });
//    }
//    mongoose.connection.close();
//});

//
//MongoClient.connect('mongodb://phsung:Raptors12@ds047571.mongolab.com:47571/db_ticketing', function (err, db) {
//    if(err) throw err;
//
//    var collection = db.collection('test_insert');
//    collection.insert({c:2}, function(err, docs) {
//        collection.find().toArray(function(err, results) {
//            console.log (format("count = %s"),results.length)
//            console.dir(results + "YOOO");
//            // Let's close the db
//            db.close();
//    });
//    
//    });
//});