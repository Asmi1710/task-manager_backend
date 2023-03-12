const express= require('express');
require('../src/db/mongoose')
const user_router= require('./routers/user_router');
const task_router= require('./routers/task_roouter')

const app = express();
const port = process.env.PORT || 3000

// to parse the incoming data
app.use(express.json());
app.use(user_router);
app.use(task_router);


app.listen(port, ()=>{
    console.log("Server is up and running at port "+port)
})