require('dotenv').config();

const express=require('express');
const mongoose=require('mongoose');

const app=express();

const PORT=process.env.PORT;

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB")
})

const booksRouter=require("./routes/books")
const userRouter=require("./routes/users")

app.use(express.json());




app.listen(PORT,()=>{
    console.log(`Server is running on the ${PORT}`)
})

app.get('/',(req,res)=>{
    console.log("hello world");
    res.send("Hello world")
})


app.use('/api/books',booksRouter);
app.use('/api/users',userRouter);