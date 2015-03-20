var express = require('express');
var app = express();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var bodyParser = require('body-parser');

/*app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});*/

mongoose.connect('mongodb://phsung:Raptors12@ds047571.mongolab.com:47571/db_ticketing',function(err){
    if (err){
        console.log ("Connection Failed");
    } else{
        console.log ("Connection Successful");
    }
});222

//MongoClient.connect('mongodb://phsung:Raptors12@ds047571.mongolab.com:47571/db_ticketing', function (err, db) {
//    if(err) throw err;
//
//    var collection = db.collection('test_insert');
//    collection.insert({b:2}, function(err, docs) {
//        collection.find().toArray(function(err, results) {
//            console.log (format("count = %s"),results.length)
//            console.dir(results + "YOOO");
//            // Let's close the db
//            db.close();
//    });
//    
//    });

    // Locate all the entries using find
//});