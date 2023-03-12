const { ObjectID } = require('bson')
const mongodb= require('mongodb')
const MongoClient= mongodb.MongoClient

const connectionURL= 'mongodb://127.0.0.1:27017'
const databaseName='task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser:true}, async (error, client)=>{
    if(error){
        return console.log("Failed to connect to database");
    }

    console.log("Connected successfully !!")

    const filter1={
        _id: new ObjectID("63a48b0e153ad30a83ade9da")
    }

    const db= client.db(databaseName)
    const users= db.collection('users')


    // $set - replaces the value of a field with a specified one
    // $inc - increments or decrements field values
    // $rename - renames fields
    // $unset - removes fields
    // $mul - multiplies a field value by a specified number
    // $min- only updates field if the specified val is less than the existing field val
    // $max= 
    // $unset- removes the specified field from the document


    // set operator
    const resultPromise1= await users.updateOne(filter1,{
        $set:{
            name:"Mamta"
        }
    }, (result, error)=>{
        // console.log("result",result)
        //  console.log("error", error)
         return true;
        }  
     )

    users.updateOne(filter1,{
        $set:{
            name:"Mom"
        }
    }).then((result)=>{
        // console.log("result",result)
    }).catch((error)=>{
        // console.log("error", error)
    })

    // inc operator
    users.updateOne(filter1,{
        $inc:{
            age:10
        }
    }).then((result)=>{
        console.log("result",result)
    }).catch((error)=>{
        console.log("error", error)
    })


    // update many
    const filter2={
        _id: new ObjectID("63a4208df717546f5b1e43bd")
    }

    const updateDoc= {
        $set:{
            completed:true
        }
    }
    const tasks= db.collection('Tasks');

    tasks.updateMany({
        completed:false
    },updateDoc).then((result)=>{
        console.log("result", result)
    }).catch((err)=>{
        console.log("error", error)
    })

})