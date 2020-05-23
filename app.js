//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  //const url = "https://sv443.net/jokeapi/v2/joke/Any?idRange=38";
  const url = "https://sv443.net/jokeapi/v2/joke/Programming";

  https.get(url, function (response) {

    let body = "";

    response.on("data", function (data) {

      body += data;



      // let stringE = "";
      // try {
      //   let d = JSON.parse(data);
      // }
      // catch (e) {
      //   console.log(e);
      //   stringE = e;
      // }
      // console.log("before: " + data);


      // res.render("index", {joke1 : data, joke2: stringE});





      // const dataJson = JSON.parse(data);

      // const type = dataJson.type;

      // if (type === "single") {
      //   res.render("index", {
      //     joke1: dataJson.joke.replace(/(\n)+/g, "<br><br>"),
      //     joke2: ""
      //   });
      // }
      // else if (type === "twopart") {
      //   res.render("index", {
      //     joke1: dataJson.setup.replace(/(\n)+/g, "<br>"),
      //     joke2: dataJson.delivery.replace(/(\n)+/g, "<br>")
      //   });
      // }
      // else {
      //   console.log("Unknow type of joke");
      // }

    });


    response.on("end", function () {

      const dataJson = JSON.parse(body);

      const type = dataJson.type;

      if (type === "single") {
        const stringJoke1 = dataJson.joke.replace(/(\n)+/g, '<br><br>').split('\"').join('<br>"');

        const htmlJoke1 = "<p class='command line2'>" +
          stringJoke1 + "<span class='cursor2fast'>_</span></p>"+
          "<p class='command line3fast'>><span class='cursor3fast'>_</span></p>";

        res.render("index", {
          joke1: htmlJoke1,
          joke2: ""
        });
      }
      else if (type === "twopart") {
        const stringJoke1 = dataJson.setup.replace(/(\n)+/g, '<br><br>');
        const stringJoke2 = dataJson.delivery.replace(/(\n)+/g, '<br><br>');

        const htmlJoke1 = "<p class='command line2'>" +
        stringJoke1 + "<span class='cursor2'>_</span></p>";

        const htmlJoke2 = "<p class='command line3'>" +
        stringJoke2 + "<span class='cursor3'>_</span></p>"+
        "<p class='command line4'>><span class='cursor4'>_</span></p>";


        res.render("index", {
          joke1: htmlJoke1,
          joke2: htmlJoke2
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