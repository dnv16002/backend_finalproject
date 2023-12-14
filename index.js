var Express = require("express");
var Mongoclient= require("mongodb"). MongoClient;
var cors=require("cors");
const multer= require("multer");

var app=Express();
app.use(cors());

var CONNECTION_STRING= "mongodb+srv://dnv16002:nikhilpace@cluster0.fxhfgwp.mongodb.net/?retryWrites=true&w=majority";


var DATABASENAME="todoappdb";
var database;

app.listen(5038,()=>{
    Mongoclient.connect(CONNECTION_STRING, (error, client)=>{
        database=client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful");
    });
})


app.get('/api/todoapp/GetNotes', (request, response)=>{
    database.collection("todoappdbcollection").find({}).toArray((error, result)=>{ 
        response.send(result);
    });

})

app.post('/api/todoapp/AddNotes', multer().none(), (request,response)=>{
    database.collection("todoappdbcollection").count({}, function(error, numOfDocs){
        database.collection("todoappdbcollection").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes
        });
        response.json("Added Succesfully");
    })
})
    
app.delete('/api/todoapp/DeleteNotes', (request, response) => {
    database.collection("todoappdbcollection").deleteOne({
        id:request.query.id
    });
    response.json("Delete Successfully");
})