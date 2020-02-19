const express = require("express"),
  path = require("path"),
  cors = require("cors"),
  app = express();
app.use(cors());

app.set("views", "../views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.listen(3000, function() {
  console.log("Hello World");
});

var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://coopertuch:aufflvC92WYg7MC5@cluster0-gr3pm.mongodb.net/test?retryWrites=true&w=majority";

app.get("/", function(req, res) {
  return res.redirect("/form-get");
});

app.get("/form-get", function(req, res) {
  return res.render("index.html");
});

app.get("/script.js", function(req, res) {
  res.sendFile(path.join(__dirname + "/script.js"));
});

app.get("/connect.js", function(req, res) {
  res.sendFile(path.join(__dirname + "/connect.js"));
});

app.get("/style.css", function(req, res) {
  res.sendFile(path.join(__dirname + "/style.css"));
});

app.get("/submit-form-get", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    let last = req.query.last;
    let dob = req.query.dob;
    let ssn = req.query.ssn;
    var query = { name: last, dob: dob, ssn: ssn };
    dbo
      .collection("debt")
      .find(query)
      .toArray(function(err, result) {
        if (!result.length) {
          console.log("No Match");
          res.send("No Match");
        } else {
          if (err) throw err;
          console.log(result);
          res.send(result);
          db.close();
        }
      });
  });
});

// const parser = require("body-parser");
// app.use(parser.urlencoded({ extended: true }));
