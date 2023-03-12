require("../db/mongoose");
const User= require("../models/Users");
const Task=require("../models/Tasks");


// User.findByIdAndUpdate("63b0a8b0f4505a93648830ef",{age:27}).then((user)=>{
    
//     console.log("changed user", user);
//     return User.find({age:24})
// }).then((users)=>{

//     console.log("Number of users with age=24 is ", users.length );
// }).catch((e)=>{

//     console.log("error", e);
// })


const updateAgeAndCount= async(id, age)=>{
    try{
        const result= await User.findByIdAndUpdate(id,{age});
        const res2= await User.find({age})
        console.log("ppl with age of 24yrs is ",res2.length);
    }catch(e){
        console.log("error",e)
    }
}

updateAgeAndCount("63b0a8b0f4505a93648830ef",24);

// Task.findByIdAndDelete("640c79aa45d1ca409eb36b22").then((user)=>{
    
//     console.log("deleted user", user);
//     return Task.countDocuments({completed:false})
// }).then((number)=>{

//     console.log("Number of incomplete tasks is ", number );
// }).catch((e)=>{

//     console.log("error", e);
// })

const deleteTaskAndCount= async(id)=>{
    const res1= Task.findByIdAndDelete(id);
    const res2 = Task.countDocuments({completed:false})
    return res2;
}

deleteTaskAndCount("640dba07ea29b31ed6e9d23c").then((res)=>{
    console.log("Incomplete tasks->", res)
}).catch((e)=>{
    console.log("Error",e);
})