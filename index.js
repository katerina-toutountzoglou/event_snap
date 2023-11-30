import express from 'express';
import bodyParser from 'body-parser';
//n
//import cors from 'cors';//Allow request from any ip

const app= express();
//n
//app.use(cors());

app.use(bodyParser.json());
app.use(express.json())    //ypoxrewtiko epeidh pairnoume parametrous
app.use(express.urlencoded({extended:false}))

import dbConfig from './db.js'; //const dbConfig=require('./db')

import eventsRoute from './routes/eventsRoute.js';
import usersRoute from './routes/usersRoute.js';
import citiesRoute from './routes/citiesRoute.js';

app.use('/api/events',eventsRoute)
app.use('/api/users',usersRoute)
app.use('/api/cities',citiesRoute)


app.get('/',(req,res)=>res.send('Hello from event snap!!!!'));

const PORT=5000;

app.listen(PORT,()=>console.log(`Server Running on port: http://localhost:${PORT}`));