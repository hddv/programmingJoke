//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  const url = "https://sv443.net/jokeapi/v2/joke/Programming";

  https.get(url, function (response) {

    response.on("data", function (data) {
      try {
        let d = JSON.parse(data);
      }
      catch (e) {
        console.log(e);
      }
      console.log("before: " + data);
      const dataJson = JSON.parse(data);

      const type = dataJson.type;

      if (type === "single") {
        res.render("index", {
          joke1: dataJson.joke.replace(/(\n)+/g, "<br>"),
          joke2: ""
        });
      }
      else if (type === "twopart") {
        res.render("index", {
          joke1: dataJson.setup.replace(/(\n)+/g, "<br>"),
          joke2: dataJson.delivery.replace(/(\n)+/g, "<br>")
        });
      }
      else {
        console.log("Unknow type of joke");
      }

    });

  });

});

app.listen(process.env.PORT || 3000, () => {
  console.log("server ...");
});