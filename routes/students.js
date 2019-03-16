var express=require("express")
var router=express.Router();

router.get("/api/students", (req, res) => {
    db.Student.find({}, (err, students) => {
        if (err) res.status(500).send(err);
        res.status(200).send(students)
    })
})

router.post("/api/students", (req, res) => {
    var newStudent = new db.Student(req.body);
    newStudent.save((err, student) => {
        if (err) res.status(500).send(err);
        res.send(student)
    })
})

router.delete("/api/students/:id", (req, res) => {
    var id = req.params.id;

    db.Student.findByIdAndDelete(id, (err, student) => {
        if (err) res.status(500).send(err);
        res.status(200).send(student)
    })
})

router.put("/api/students/:id", (req, res) => {
    var id = req.params.id;

    db.Student.findByIdAndUpdate(id, req.body, { new: true }, (err, student) => {
        if (err) res.status(500).send(err);
        res.status(200).send(student)
    })
})

router.get("/api/students/:id", (req, res) => {
    var id = req.params.id;

    db.Student.findById(id, (err, student) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send(student)
    })
})

//Update student status "active" to false
router.put("/api/students/updatestatus/:id", (req, res) => {
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

router.delete("/api/students/removebyage/:age",(req,res)=>{
    var age=req.params.age;

    db.Student.deleteMany({age:{ $lt: age}},(err,students)=>{
        if (err) res.status(500).send(err);
        res.status(200).send(students)
    })
})

module.exports=router;