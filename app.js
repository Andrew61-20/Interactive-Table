const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const config = require("config");
const path = require("path");
const app = express();
app.use(express.json({ extended: true }));
const PORT = config.get("port") || 5000;

// app.use(express.static(__dirname + "/public"));

// if (process.NODE_ENV === "production") {
//   // app.use('/', express.static(path.join(__dirname, 'client', 'build')))
//   // app.get('*', (req, res) => {
//   //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   // })
// }

app.get("/api/jobs", function (req, res) {
  const mongoClient = new MongoClient(
    "mongodb+srv://andrey1:aa610102@cluster0.doumg.mongodb.net/sample_supplies?retryWrites=true&w=majority"
  );

  mongoClient.connect(function (err, client) {
    if (err) {
      console.log(err);
      res.send("DB initialization error");
    }

    const job = client
      .db("sample_supplies")
      .collection("job")
      .find({})
      .toArray(function (err, jobs) {
        if (err) return console.log(err);
        res.send(jobs);
      });
  });
});

app.get("/", (req, res) => {
  res.send("Service is working!");
});

app.listen(PORT, () => {
  console.log(`This app is running on http://localhost:${PORT}`);
});
