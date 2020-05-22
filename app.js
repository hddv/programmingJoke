//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res)=>{



  res.render("index", {joke1: "hello", joke2: "hello again"});
});

app.listen(3000, ()=>{
  console.log("server on 3000 port ...");
})