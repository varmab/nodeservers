var express=require('express');
var app=express();

app.get("/",(req,res)=>{  // http://localhost:8000/
    res.send("Welcome to Server 1")
})

app.listen(8000);