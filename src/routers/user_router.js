const express= require('express')
const User= require("../models/Users");

const router= new express.Router();

router.post('/users',async(req, res)=>{
    // let dataInput = new User (req?.body);
    // dataInput.save().then(()=>{
    //         console.log("Result", dataInput)
    //         res.status(201).send(dataInput)
    //     })
    // .catch((error)=>{
    //         console.log("Error", error)
    //         res.status(400).send(error);
    //     })

    try{
        let dataInput = new User (req?.body);
        await dataInput.save();
        res.status(201).send(dataInput)
    }catch(error){
        console.log("Error", error)
        res.status(400).send(error);
    }
    
})


// get list of users
router.get("/users", async(req,res)=>{
    // User.find({}).then((users)=>{
    //     res.status(201).send(users);
    // }).catch((error)=>{
    //     res.status(500).send(error);
    // })
    try{
        const users= await User.find({});
        res.status(201).send(users);
    }catch(error){
        console.log("Error", error)
        res.status(500).send(error);
    }
})

// fetch a single user
router.get('/users/:id',async(req, res)=>{
    // const idVal= req?.params?.id; 
    // console.log(idVal);
    // User.findById(idVal).then((user)=>{
    //     if(user){
    //         res.status(200).send(user)
    //     }else{
    //         res.status(400).send("User not found")
    //     }
    // }).catch((e)=>{
    //     res.status(500).send(e);
    // })

    try{
        const idVal= req?.params?.id; 
        const user= await User.findById(idVal)
        
        if(user){
           return res.status(200).send(user)
        }
        res.status(400).send("User not found")
        
    }catch(error){
        res.status(500).send(error);
    }
})


// update a single user
router.patch('/users/:id', async(req, res)=>{

    const updates= Object.keys(req?.body);
    const validUpdates=['name','age','email','pasword'];
    const isValidUpdate= updates.every((field)=>validUpdates.includes(field))

    if(!isValidUpdate){
        return res.status(400).send("Update of a non-existing property is invalid.")
    }
    try{
        const _id=req?.params?.id;
        //{new:true} - returns a new user after update
        const user= await User.findByIdAndUpdate(_id, req?.body, {
            new:true,
            runValidators:true});

        // no existing user with id
        if(!user){
            return res.status(404).res("User not found")
        }    
        res.status(200).send(user);
    }catch(e){
        res.status(400).send(e)
    }
})


// delete a user

router.delete('/users/:id',async(req,res)=>{
    try{
        const _id= req?.params?.id;
        const user = await User.findByIdAndDelete(_id);

        if(!user){
            return res.status(400).send("User doesn't exist");
        }
        res.status(200).send("Data deleted successfully.")
    }catch(e){
        res.status(400).send(e);
    }
})


module.exports = router