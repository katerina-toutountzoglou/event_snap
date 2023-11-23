import express from 'express';

const router= express.Router();
import User from '../models/user.js';

router.post("/register",async(req,res)=>{
    // anti gia req.body mporw na grapsw ({name:req.body.name, email: req.body.email, password:req.body.password})
    const newuser=new User(req.body)
    try{
        const user=await newuser.save()
        res.send('User Registered Successfully!')
    }catch(error){
        return res.status(400).json({error});
    }


});

router.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await User.findOne({email: email,password: password})
        if(user){
            //res.send(user) ayto den to grafw gia na mhn steilw kai fainetai to password tou xristi
            const temp={
                name:user.name,
                email:user.email,
                isAdmin: user.isAdmin,
                _id:user._id,

            }
            res.send(temp)
        }
        else{
            return res.status(400).json({message: 'Login failed'});
        }
    }catch(error){
        return res.status(400).json({error});
    }

});


export default router;



