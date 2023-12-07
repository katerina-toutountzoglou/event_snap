import express from 'express';
import mongoose from 'mongoose';

import cors from 'cors';


const router= express.Router();
import Event from '../models/event.js';




router.get('/getallevents',async (req,res)=>{
    try{
        let query={};
        
        
        // Check if category parameter is provided
        if (req.query.event_type) {
           query.event_type = req.query.event_type;
        }
        
        // Check if city parameter is provided
        if (req.query.location) {
           query.location = req.query.location;
        }
        
        const events = await Event.find(query);
        res.json(events);
        
    }catch(error){
        return res.status(500).json({message: error});

    }
});



router.put('/bookevent',async (req,res)=>{
   
    try{
       const {event_id,tickets}=req.body;
       const numoftickets=parseInt(req.body.tickets,10);
     
       const event=await Event.findOne({_id: req.body.event_id});
      
       if(!event){
        console.log("event not found!");
        return res.status(400).json({message: error});
       }
       if(event.remaining_tickets===0){
        return res.status(400).json({message: 'Sold out!'});
       }
       if(event.remaining_tickets<numoftickets){
        return res.status(400).json({message:'Sorry! Not enough tickets!'});
       }
      
       const temp= event.remaining_tickets-numoftickets;
          
       const event2=await Event.findOneAndUpdate({_id:event_id},{remaining_tickets:temp},{new:true});
       res.send({message: 'You have made a successful booking!'});
       
    }catch(error){
        return res.status(400).json({message: error});

    }
});



export default router;
