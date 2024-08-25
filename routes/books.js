const express=require("express");
const router =express.Router();

books=[
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "published_year": 1925,
      "genre": "Novel"
    },
    {
      "id": 2,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "published_year": 1960,
      "genre": "Fiction"
    },
    {
      "id": 3,
      "title": "1984",
      "author": "George Orwell",
      "published_year": 1949,
      "genre": "Dystopian"
    },
    {
      "id": 4,
      "title": "Pride and Prejudice",
      "author": "Jane Austen",
      "published_year": 1813,
      "genre": "Romance"
    },
    {
      "id": 5,
      "title": "The Catcher in the Rye",
      "author": "J.D. Salinger",
      "published_year": 1951,
      "genre": "Fiction"
    },
    {
      "id": 6,
      "title": "Moby Dick",
      "author": "Herman Melville",
      "published_year": 1851,
      "genre": "Adventure"
    },
    {
      "id": 7,
      "title": "War and Peace",
      "author": "Leo Tolstoy",
      "published_year": 1869,
      "genre": "Historical Fiction"
    },
    {
      "id": 8,
      "title": "The Hobbit",
      "author": "J.R.R. Tolkien",
      "published_year": 1937,
      "genre": "Fantasy"
    },
    {
      "id": 9,
      "title": "The Da Vinci Code",
      "author": "Dan Brown",
      "published_year": 2003,
      "genre": "Thriller"
    },
    {
      "id": 10,
      "title": "The Road",
      "author": "Cormac McCarthy",
      "published_year": 2006,
      "genre": "Post-Apocalyptic"
    }
]


router.get('/',(req,res)=>{
    res.send(books)
})

router.get('/:id',(req,res)=>{
    const id=req.params.id;
    const book=books.find(book=>book.id===parseInt(id));
    res.send(book)
})

router.post('/',(req,res)=>{
    const book=req.body;
    book.id=books.length+1
    books.push(book);
    res.send(book);
})

router.put('/:id',(req,res)=>{
    const id=req.params.id
    const book=books.findIndex(book=>book.id===parseInt(id));
    const updatebook={...books[book],...req.body};
    books[book]=updatebook
    res.send(updatebook);
})

router.delete('/:id',(req,res)=>{
    const id=req.params.id
    const book=books.findIndex(book=>book.id===parseInt(id));
    books.splice(book,1)
    res.send({message:"Book deleted successfully"});
})


module.exports=router