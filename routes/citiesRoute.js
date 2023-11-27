import express from 'express';

const router= express.Router();
import City from '../models/city.js';


router.get('/getallcities',async (req,res)=>{
    try{
        const cities=await City.find({});
       res.send(cities);

    }catch(error){
        return res.status(400).json({message: error});

    }
});

router.patch('/insertcity',async(req,res)=>{
   
    const newcity=new City({name:"kate",info:"kdjk",image:"jdsh"});
    try{
       const city=await newcity.save();
        res.send('City has been inserted successfully!')
    }catch(error){
        return res.status(400).json({error});
    }


});





router.post('/getcitybyname/:cityname',async (req,res)=>{
    try{
        const {cityname}=req.params;
    
        const city=await City.find({name: cityname});
       res.send({city});
       
    }catch(error){
        return res.status(400).json({message: error});

    }
});




export default router;
