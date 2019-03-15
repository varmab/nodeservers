var express = require("express");
var path=require("path")
var app = express();

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

app.get("/api/students", (req, res) => {
    db.Student.find({}, (err, students) => {
        if (err) res.status(500).send(err);
        res.status(200).send(students)
    })
})

app.post("/api/students", (req, res) => {
    var newStudent = new db.Student(req.body);
    newStudent.save((err, student) => {
        if (err) res.status(500).send(err);
        res.send(student)
    })
})

app.delete("/api/students/:id", (req, res) => {
    var id = req.params.id;

    db.Student.findByIdAndDelete(id, (err, student) => {
        if (err) res.status(500).send(err);
        res.status(200).send(student)
    })
})

app.put("/api/students/:id", (req, res) => {
    var id = req.params.id;

    db.Student.findByIdAndUpdate(id, req.body, { new: true }, (err, student) => {
        if (err) res.status(500).send(err);
        res.status(200).send(student)
    })
})

app.get("/api/students/:id", (req, res) => {
    var id = req.params.id;

    db.Student.findById(id, (err, student) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send(student)
    })
})

//Update student status "active" to false
app.put("/api/students/updatestatus/:id", (req, res) => {
    var id = req.params.id;
    db.Student.findByIdAndUpdate(id,
        { $set: { active: false } },
        { new: true },
        (err, student) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(student)
        })
})

app.delete("/api/students/removebyage/:age",(req,res)=>{
    var age=req.params.age;

    db.Student.deleteMany({age:{ $lt: age}},(err,students)=>{
        if (err) res.status(500).send(err);
        res.status(200).send(students)
    })
})


app.listen(8000);





