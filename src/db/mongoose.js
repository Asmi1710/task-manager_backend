const mongoose= require('mongoose');
// const MongoClient= require("mongodb")
// const validator= require('validator')
// const User= require('../models/Users');
// const Task= require('../models/Tasks');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',
{ useNewUrlParser: true,
// useCreateIndex:true
});

mongoose.set('strictQuery', true);




// const me= new User ({
//     name:"Rajjoo",
//     age:29,
//     email:"RAJANNGPL14@gmail.com",
//     // password:"PASsword123",
//     password:"hewMoment"
// })

// me.save().then(()=>{
//     console.log("Result",me)
// }).catch((error)=>{
//     console.log("Error", error)
// })




// const todayTask= new Task({
//     description:"Cleaning balcony",
//     completed:false
// })

// todayTask.save().then(()=>{
//     console.log("TodayTask: ", todayTask);
// }).catch((error)=>{
//     console.log("Error:", error)
// })