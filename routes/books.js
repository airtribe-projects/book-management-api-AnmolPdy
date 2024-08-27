const express=require("express");
const jwt=require("jsonwebtoken");
const router =express.Router();

const Books=require("../models/books")

const validateJWT=(req,res,next)=>{
  const authheader=req.headers.authorization;
  const token = authheader.split(' ')[1];
  const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
  console.log({decodedToken});
  if (decodedToken.username){
    req.user=decodedToken;
    next()
  }else {
    res.status(401).send("unauthorized");
  }
};

router.use(validateJWT)

router.get('/',async(req,res)=>{
    const{page=1,limit=5}=req.query;
    const genre=req.query.genre || "";
    const query=genre?{genre}:{};
    console.log(`Query: ${JSON.stringify(query)}`);
    const books=await Books.find(query)
      .limit(parseInt(limit*1))
      .skip(parseInt(page-1)*parseInt(limit))
      .exec();
    const count=await Books.countDocuments(query);

    res.send({
      books,
      totalPages:Math.ceil(count/limit),
      currentPage:page,
    });
})

router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    const book=await Books.findById(id)
    if(book){
    res.send(book)
    }
    else{
      res.status(404).send("Book not found");
    }
})

router.post('/',async(req,res)=>{
    const book=req.body;
    const bookCreated=await Books.create(book);
    res.send(bookCreated);
})

router.put('/:id',async(req,res)=>{
    const id=req.params.id
    const newbook=req.body
    const updatebook=await Books.findByIdAndUpdate(id,newbook,{new:true})
    if(!updatebook)return res.status(404).send("Book not found");
    res.send(updatebook);
})

router.delete('/:id',async(req,res)=>{
    const id=req.params.id
    const delbook=await Books.findByIdAndDelete(id)
    res.send({message:"Book deleted successfully"});
})


module.exports=router