const express= require('express');
const Task = require('../models/Tasks');

const TaskRouter= new express.Router();

//create task
TaskRouter.post("/tasks", async(req,res)=>{
    // let dataInput= new Task(req?.body);

    // dataInput.save().then(()=>{
    //     console.log("Result", dataInput);
    //     res.status(201).send(dataInput);
    // })
    // .catch((error)=>{
    //     console.log("Error", error);
    //     res.status(400).send(error);
    // })

    try{

        let dataInput= new Task(req?.body);
        await dataInput.save();
        res.status(201).send(dataInput);
    }catch(error){
        console.log("Error", error);
        res.status(400).send(error);
    }

})


// get list of tasks
TaskRouter.get("/tasks",async(req,res)=>{
    // Task.find({}).then((tasks)=>{
    //     res.status(200).send(tasks);
    // }).catch((e)=>{
    //     res.status(500).send("Bad server status");
    // })

    try{
        const tasks= await Task.find({});
        res.status(200).send(tasks);
        
    }catch(e){
        res.status(500).send(e);
    }

})

// find one task by id
TaskRouter.get("/tasks/:id", async(req,res)=>{
    // const _id=req?.params?.id;
    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         res.status(404).send("Task not found")
    //     }else{
    //         res.status(200).send(task);
    //     }
    // }).catch((e)=>{
    //     res.status(500).send("Bad server status");
    // })

    try{
        const _id=req?.params?.id;
        const task= await Task.findById(_id)
        if(!task){
            res.status(404).send("Task not found")
        }else{
            res.status(200).send(task);
        }

    }catch(e){
        res.status(500).send("Bad server status");
    }

})


// update a single task

TaskRouter.patch("/tasks/:id", async(req, res)=>{

    const validFields=['description','completed'];
    const updates= Object.keys(req?.body);
    const isValid= updates.every((field)=>validFields.includes(field));

    if(!isValid){
       return res.status(400).send("Invalid update request")
    }
    try{
        const _id= req?.params?.id
        const task= await Task.findByIdAndUpdate(_id, req?.body, {new:true, runValidators:true});
        
        if(!task ){
            return res.status(400).send("Task not found");
        }
        res.status(200).send(task);

    }catch(e){
        res.status(400).send(e);
    }
})


// delete a task 

TaskRouter.delete('/tasks/:id',async(req,res)=>{
    try{
        const _id= req?.params?.id;
        const task = await Task.findByIdAndDelete(_id);

        if(!task){
            return res.status(400).send("Task doesn't exist");
        }
        res.status(200).send("Data deleted successfully.")
    }catch(e){
        res.status(400).send(e);
    }
})


module.exports = TaskRouter;