//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let indexJoke = 1;

app.get("/", function (req, res) {

  if(indexJoke > 58){ indexJoke = 1;}

  const url = "https://sv443.net/jokeapi/v2/joke/Any?idRange="+indexJoke;
  //const url = "https://sv443.net/jokeapi/v2/joke/Programming";

  https.get(url, function (response) {

    let body = "";

    response.on("data", function (data) {
      body += data;
    });


    response.on("end", function () {

      const dataJson = JSON.parse(body);

      const type = dataJson.type;

      if (type === "single") {
        let stringJoke1A = dataJson.joke;
        let indices = getIndicesOf('"', stringJoke1A);
        let stringJoke1 = addBR(indices, stringJoke1A).replace(/(\n)+/g, '<br>');

        const htmlJoke1 = "<p class='command line2'>" +
          stringJoke1 + "<span class='cursor2fast'>_</span></p>"+
          "<p class='command line3fast'>><span class='cursor3fast'>_</span></p>";

        res.render("index", {
          joke1: htmlJoke1,
          joke2: ""
        });

        indexJoke++;
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

        indexJoke++;
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



/* FUNCTIONS */

function getIndicesOf(searchStr, str, caseSensitive) {
  var searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
      return [];
  }
  var startIndex = 0, index, indices = [];
  if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
  }
  return indices;
}



String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};



function addBR(array, str) {
  if(array.length % 2 === 0){
    let result = str;
    let buffer = 0;

    for(let i = 0; i < array.length; i++){
      if(i % 2 === 0){
        result = result.splice(array[i]+buffer, 0, '<br>');
      }
      else{
        result = result.splice(array[i]+buffer+1, 0, '<br>'); 
      }
      buffer += 4;
    }
    return result;
  }
  else{
    return str;
  }
};