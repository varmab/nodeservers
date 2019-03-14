var express=require('express');
var path=require("path")
var app=express();

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

app.listen(8000);
