import express from 'express';

const router= express.Router();
import City from '../models/city.js';


router.get('/getallcities',async (req,res)=>{
    try{
        let query={};
        
        
        // Check if name parameter is provided
        if (req.query.name) {
           query.name = req.query.name;
        }
                
        //console.log(query);
        const cities = await City.find(query);
        res.json(cities);
        
    }catch(error){
        return res.status(500).json({message: error});

    }
});



export default router;
