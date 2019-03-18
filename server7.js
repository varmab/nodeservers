var express=require('express');
var graphqlHTTP=require('express-graphql');
var db = require('./db');
var { buildSchema } = require('graphql');

var schema=buildSchema(`
    type Student {
        name:String,
        age:Int
    }

    type Query{
        allStudents:[Student]
    }

    type Mutation{
        createStudent(name:String,age: Int):Student
    }
`)

var resolvers={
    allStudents:(_,args)=>{
        return new Promise((resolve,reject)=>{
            db.Student.find({},(err,students)=>{
                if(err) reject(err);
                resolve(students);
            })
        })
    },

    createStudent:({name,age})=>{
        return new Promise((resolve,reject)=>{
            var newStudent=new db.Student({
                name,
                age
            })

            newStudent.save((err,student)=>{
                if(err) reject(err);
                resolve(student)
            })
        })
    }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));
app.listen(4000);
