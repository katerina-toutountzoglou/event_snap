import express from 'express';
import bodyParser from 'body-parser';


const app= express();


app.use(bodyParser.json());
app.use(express.json())    //ypoxrewtiko epeidh pairnoume parametrous
app.use(express.urlencoded({extended:false}))

import dbConfig from './db.js'; //const dbConfig=require('./db')

import eventsRoute from './routes/eventsRoute.js';
import usersRoute from './routes/usersRoute.js';

app.use('/api/events',eventsRoute)
app.use('/api/users',usersRoute)


app.get('/',(req,res)=>res.send('Hello from homepage!!'));

const PORT=5000;
app.listen(PORT,()=>console.log(`Server Running on port: http://localhost:${PORT}`));