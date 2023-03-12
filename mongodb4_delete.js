const mongodb = require("mongodb")
const MongoClient= mongodb.MongoClient

const connectionURL="mongodb://127.0.0.1:27017"
const databaseName="task-manager"

MongoClient.connect(connectionURL, {useNewUrlParser:true}, async (error, client)=>{
    if(error){
        return console.log("Connection error")
    }

    console.log("connected successfully!")


    // delete many with age = 32
    const db= client.db(databaseName);
    const users= db.collection('users')
    const filter1={
        age:32
    }
    users.deleteMany(filter1).then((result)=>{
        console.log("result", result)
    }).catch((err)=>{
        console.log("err", err)
    })

    // delete one task

    const tasks= db.collection("Tasks");
    tasks.deleteOne({
        description:"Laundry"
    }).then((result)=>{
        console.log("result", result)
    }).catch((err)=>{
        console.log("err", err)
    })

})