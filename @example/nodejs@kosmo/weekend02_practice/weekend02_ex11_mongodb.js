var MongoClient = require('mongodb').MongoClient;

var dbUrl = 'mongodb://localhost';
MongoClient.connect(dbUrl, function(err, client){
    if(err) { throw err; }
    
    var db = client.db('vehicle');
    var car = db.collection('car');
    
    /*car.findOne({}, function(findErr, doc) {
        if(findErr) { throw findErr; }
        
        console.log(doc.name);
        client.close();
    });*/
    
    car.find({price:{$gt:2000}}).toArray(function(findErr, results){
        if(err) { throw findErr; }
        console.log(results); 
    });
});