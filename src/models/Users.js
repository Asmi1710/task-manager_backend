const mongoose= require('mongoose');
const validator= require('validator');


const User=mongoose.model('User',{
    name:{
        type:String, 
        default:"anonymous",
        required:true,
        trim:true
    },
    age: {
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error("Age must be a positive number")
            }
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Valid Email is required")
            }
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minLength:7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Please avoid using term password in your password")
            }
        }
    }
})


module.exports = User;