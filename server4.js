var express = require("express");
var path=require("path")
var app = express();
var students = require('./routes/students')

var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var db = require('./db');

app.use(express.static("www"));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, '/www', '/index.html'));
})

app.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname, '/www', 'contact.html'));
})

app.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname, '/www', 'about.html'));
})

app.get("/students",(req,res)=>{
    res.sendFile(path.join(__dirname, '/www', 'students.html'));
})

app.use("/ap/students", students);


app.listen(8000);





