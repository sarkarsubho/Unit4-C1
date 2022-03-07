const express=require("express");

const app =express();

app.use(logger);


app.get("/books",logger,(req,res)=>{
    return res.send({ route: "/books"});
});


app.get("/libraries",logger,checkPermission("librarian"),(req,res)=>{
    return res.send({ route: "/libraries", permission: true})
})

app.get("/authors",logger,checkPermission("author"),(req,res)=>{
    return res.send({ route: "/authors", permission: true})
})

function checkPermission(role){

return function logger(req,res,next){
    if(role==="librarian" || role==="author"){
        return next()
    }
    return res.send("Not Allowed")  
 };

}

function logger(req,res,next){
    if(req.path==="/books"){
        req.role="books"
    }else if(req.path==="/libraries"){
        req.role="libraries"
    }else if(req.path==="/authors"){
        req.role="authors"
    }else{
        req.role="nobady"
    }
    next();
}

app.listen(3000,()=>{
    console.log("listning on port 3000")
})