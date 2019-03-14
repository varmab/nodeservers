var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/school")

var studentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:Number,
    registrationDate:{
        type:Date,
        default: Date.now()
    },
    active:{
        type:Boolean,
        default:true
    }
})

//Create model
exports.Student=mongoose.model('Student',studentSchema,'students')