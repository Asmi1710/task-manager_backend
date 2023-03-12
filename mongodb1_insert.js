// CRUD operations

const mongodb= require("mongodb");
const MongoClient= mongodb.MongoClient;
const { UUID } = require('bson');

// const connnectionURL='mongodb://192.168.20.154:27017'
const connnectionURL='mongodb://127.0.0.1:27017'
const databaseName= 'task-manager'



// 1st arg-> connection URL, 2nd arg-> options argument
MongoClient.connect(connnectionURL, { useNewUrlParser: true} , async (error, client )=>{
    if(error){
        return console.log("Unable to connect with db", error)
    }

    console.log("Connected correctly !!")

    try{
        // reference to which db we want to manipulate
        const db= client.db(databaseName)

        // ----> in noSQL db like mongodb, we don't have tables but collections
        // ----> insertOne is async function
        // ----> we are adding callback function

        const data ={
            name:'Asmita',
            age:32
        };
        const  resultOne = await db.collection('users').insertOne(data)

        console.log("result",resultOne)
        console.log(`A document was inserted with the _id: ${resultOne.insertedId}`)

        // ----> inserting more than 1 data
        const dataMany1=[{
             _id:'00000001',
            name:'Asmita',
            age:32
        },{
             _id:'00000002',
            name:'Rajan',
            age:28
        }];

        const resultMany= await db.collection('users').insertMany(dataMany1);

        // console.log("many insertion result", resultMany);

        const dataMany2=[{
            description:"Laundry",
            completed:true
        },{
            description:"Cooking",
            completed:true
        },{
            description:"Cleaning",
            completed:false
        }]

        const result= await db.collection('Tasks').insertMany(dataMany2);
        console.log("Result of insertMany", result);

        //objectId-> auto-generated and it GUID- globally unique identifiers, they are designed to be unique using algo
        // w/o requiring server to decide what will be next id will be
        // ability to scale low in a distributed system, ability to handle heavy traffic and no conflict in dbs


    }catch(err){
        console.log("err", err);
    }
    
})


