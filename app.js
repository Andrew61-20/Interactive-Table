const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const config = require('config');
const path = require('path');
const app = express();
app.use(express.json({extended: true}))
const PORT = config.get('port') || 5000
  
const mongoClient = new MongoClient("mongodb+srv://andrey1:aa610102@cluster0.doumg.mongodb.net/sample_supplies?retryWrites=true&w=majority");
app.use(express.static(__dirname + "/public"));

// if(process.NODE_ENV === 'production') {
//     app.use('/', express.static(path.join(__dirname, 'client', 'build')))
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }

mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    app.locals.collection = client.db("sample_supplies").collection("job");
    app.listen(PORT, function(){
        console.log(`App has been started on port ${PORT}...`);
    });
});

app.get("/api/jobs", function (req, res) {
    const job = app.locals.collection.find({}).toArray(function(err, jobs){
        if(err) return console.log(err);
        res.send(jobs)
    });
       
});

