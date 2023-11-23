import express from 'express';

const router= express.Router();
import Event from '../models/event.js';


router.get('/getallevents',async (req,res)=>{
    try{
        const events=await Event.find({});
       res.send(events);

    }catch(error){
        return res.status(400).json({message: error});

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
router.post('/geteventbylocation',async (req,res)=>{
    
    const eventlocation=req.body.eventlocation
    try{
        const event=await Event.find({location: eventlocation});
       res.send(event);
       console.log(event);

    }catch(error){
        return res.status(400).json({message: error});

    }
});
*/
router.post('/geteventbylocation/:eventlocation',async (req,res)=>{
    try{
        const {eventlocation}=req.params;
    
        const event=await Event.find({location: eventlocation});
       res.send({event});
       
    }catch(error){
        return res.status(400).json({message: error});

    }
});
/*
router.patch('/bookevent',async (req,res)=>{
   

    //...
    try{
         const {eventid,numoftickets}=req.body.bookevent;
        
      
      const event=await Event.findOne({_id: eventid})
       if(!event){
        return res.status(400).json({message: error});
       }
       if(event.remaining_tickets<numoftickets){
        return res.status(400).json({message:'Sorry! Not enough tickets!'});
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
//
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



export default router;
