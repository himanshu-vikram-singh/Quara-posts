const express=require("express");
const app=express();
port=8080;
const path=require("path");
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended : true }));
const { v4: uuidv4 } = require('uuid');


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
let posts=[
    { 
        id:uuidv4(),
        username:"himansh vikram singh",
        content:"i love coding",
    },
    {
         id:uuidv4(),
        username:"Shashank shukla",
        content:"i love my family",
    },
    {
        id:uuidv4(),
       username:"raghvendra pratap singh",
       content:"i love my country"
    }
]
app.get("/posts",(req,res)=>{
 
    res.render("index.ejs",{posts});
});
app.get("/posts/newpost",(req,res)=>{
   
    res.render("index1.ejs");
});
app.post("/posts",(req,res)=>{
    console.log("request 2 submitted");
  let id=uuidv4();
   
    let { user,content}=req.body;
    posts.push({ id,user,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
   
    let post=posts.find((p)=>
        id==p.id);

   console.log(post); 
    
   res.render("index2.ejs",{post});

});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>
        id==p.id);
    post.content=newcontent; 
   res.redirect("/posts");
});
app.delete("/posts/:id",(req,res)=>{
    
    let {id}=req.params;
     posts=posts.filter((p)=>
        id!=p.id); 
     res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    
let {id}=req.params;

let post=posts.find((p)=>
 id==p.id);
res.render("index3.ejs",{post});  
});



app.listen(port,()=>{
    console.log("listening to port");
});

