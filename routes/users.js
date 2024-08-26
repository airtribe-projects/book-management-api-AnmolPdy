const express=require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const router=express.Router();

const hashpassword=async(password)=>{
    const hash=await bcrypt.hash(password,10)
    return hash
}


users=[
    {
        id:1,
        username:"Anmol",
        email:"anmol@example.com",
        password:""
        
    }
]

router.post('/register',async(req,res)=>{
    const body=req.body
    const existing_user=users.find(user=>user.username===body.username && user.email===body.email)
    if (!existing_user){
        const hashedpassword=await hashpassword(body.password)
        const newUser={id:users.length+1,username:body.username,email:body.email,password:hashedpassword}
        users.push(newUser)
        res.send(newUser)
    }
    else{res.send({message:"User already exists"})}
})

router.get('/',(req,res)=>{
    res.send(users)
})

router.post('/login',async(req,res)=>{
    const body=req.body
    const userexist=await users.find(user=>user.username===body.username&&  bcrypt.compare(user.password,body.password))
    if (userexist){
        
        const token=jwt.sign({username:userexist.username,email:userexist.email},process.env.JWT_SECRET)
        res.send(token)
    }
    else res.send({message:"incorrect login details"})
})



module.exports=router