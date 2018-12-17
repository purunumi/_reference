var mongojs = require('mongojs');
var db = mongojs('vehicle', ['car']);

db.car.find(function(err, data) {
    
    console.dir(data);
    
});