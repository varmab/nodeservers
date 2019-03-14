var express=require("express");
var app=express();

var bodyParser=require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var db=require('./db');

app.get("/api/students",(req,res)=>{
    db.Student.find({},(err,students)=>{
        if(err) res.status(500).send(err);
        res.status(200).send(students)
    })
})

// name=Varma&age=46

/*
    {
        name:"Varma",
        age:46
    }
*/

app.post("/api/students",(req,res)=>{
    var newStudent=new db.Student(req.body);
    newStudent.save((err,student)=>{
        if(err) res.status(500).send(err);
        res.send(student)
    })
})

app.listen(8000);





