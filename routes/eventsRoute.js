import express from 'express';
import mongoose from 'mongoose';


const router= express.Router();
import Event from '../models/event.js';

/* //to get pou douleuei
router.get('/getallevents',async (req,res)=>{
    try{
        const events=await Event.find({});
       res.send(events);

    }catch(error){
        return res.status(400).json({message: error});

    }
});
*/


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

router.post('/geteventbyid',async (req,res)=>{
    
    const eventid=req.body.eventid
    try{
        const event=await Event.findOne({_id: eventid});
       res.send(event);
       console.log(event);

    }catch(error){
        return res.status(400).json({message: error});

    }
});

/*
router.get('/geteventbylocation/:eventlocation',async (req,res)=>{
    try{
        const {eventlocation}=req.params;
    
        const event=await Event.find({location: eventlocation});
       res.send(event);
       
    }catch(error){
        return res.status(400).json({message: error});

    }
});
*/


router.put('/bookevent',async (req,res)=>{
   
    try{
         const {event_title,numoftickets1}=req.body;

         const numoftickets=parseInt(req.body.numoftickets1,10);

         console.log(numoftickets);
         
      
      const event=await Event.find({event_title: req.body.event_title});
      console.log(event.location);
       if(!event){
        console.log("event not found!");
        return res.status(400).json({message: error});
       }
       if(event.remaining_tickets<numoftickets){
        return res.status(400).json({message:'Sorry! Not enough tickets!'});
       }
       if(event.remaining_tickets===0){
        return res.status(400).json({message: 'Sold out!'});
       }
       const temp= event.remaining_tickets-numoftickets;
       event.remaining_tickets=temp;

       const event2=await Event.findOneAndUpdate({_id: eventid},{remaining_tickets:temp},{new:true});

       res.send({message: 'You have made a successful booking!'});
       
    }catch(error){
        return res.status(400).json({message: error});

    }
});




/*


router.patch('/bookevent/:eventid/:numoftickets',async (req,res)=>{
   
    try{
         const {eventid,numoftickets}=req.params;
         
      
      const event=await Event.findOne({_id: eventid})
       if(!event){
        return res.status(400).json({message: error});
       }
       if(event.remaining_tickets<numoftickets){
        return res.status(400).json({message:'Sorry! Not enough tickets!'});
       }
       if(event.remaining_tickets===0){
        return res.status(400).json({message: 'Sold out!'});
       }
       const temp= event.remaining_tickets-numoftickets;
       event.remaining_tickets=temp;

       const event2=await Event.findOneAndUpdate({_id: eventid},{remaining_tickets:temp},{new:true});

       res.send({message: 'You have made a successful booking!'});
       
    }catch(error){
        return res.status(400).json({message: error});

    }
});

*/


export default router;
