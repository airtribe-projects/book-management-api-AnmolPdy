const express=require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const router=express.Router();

const User=require("../models/user")



router.post('/register',async(req,res)=>{
    const {username,email,password}=req.body
    const existing_user=await User.findOne({$or:[{username},{email}]})
    if (!existing_user){
    const hashedPassword=await bcrypt.hash(password,10);
    const userdb=await User.create({username,email,password:hashedPassword});
    res.status(201).send(userdb)
    }
    else{res.send({message:"User already exists"})}
})


router.post('/login',async(req,res)=>{
    const {username, password }=req.body
    const userexist=await User.findOne({username});
    if (userexist){
        const pass_check=await bcrypt.compare(password,userexist.password);
        if(pass_check){
            const token=jwt.sign({username:userexist.username,email:userexist.email},process.env.JWT_SECRET)
            res.status(200).send({token})
        }
        else return res.status(401).send("Invalid Password")
    }
    else res.status(400).send({message:"incorrect login details"})
})



module.exports=router