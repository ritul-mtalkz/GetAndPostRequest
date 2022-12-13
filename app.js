let express = require('express');
let app = express();
let MongoClient = require('mongodb').MongoClient;
app.use(express.json());
var url = "mongodb://localhost:27017/";

app.listen(3000, () => console.log("Server running on port 3000!"))

app.post('/', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("customers").insertOne({
            name: req.body.name,
            age: req.body.age,
            phone: req.body.phone,
            email: req.body.email
        }, 
        function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});

app.get('/:name', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("customers").findOne({
            name: req.params.name
        }, 
        function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});
