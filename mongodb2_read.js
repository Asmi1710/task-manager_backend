const { ObjectID } = require('bson');
const mongodb= require('mongodb');
const MongoClient = mongodb.MongoClient;


const connectionURL='mongodb://127.0.0.1:27017';
const databaseName= 'task-manager' ;


MongoClient.connect(connectionURL,{ useNewUrlParser: true}, async (error, client)=>{
    if(error){
        return console.log("Error in connection", error)
    }

    console.log("Connected successfully !!");

    try{
        const db= client.db(databaseName);
        const users= db.collection('Tasks')
        const query= {
            _id: new ObjectID("63a4208df717546f5b1e43bd"),
        }

        // const options = {
        //     // sort matched documents in descending order by rating
        //     sort: { "imdb.rating": -1 },
        //     // Include only the `title` and `imdb` fields in the returned document
        //     projection: { _id: 0, title: 1, imdb: 1 },
        //   };


        const resultOne= await users.findOne(query);
        if(resultOne){
            console.log("resultOne",resultOne);
        }
        

        const queryMany= {
            completed: true,
        }

        // to find multiple outputs

        const resultMany= await users.find(queryMany).toArray();
        const resultCount= await users.countDocuments(queryMany);
        // find will give a reference to a cursor
        if(resultMany){
            console.log("resultMany",resultMany);
            console.log("resultMany count",resultCount);
        }


        //await cursor.forEach(console.dir);
        // if(result){
        //     let op=result.name;
        //         print (tojson(myName));
    }catch(err){
        console.log("Error-----", err);
    }
    
})