const express = require('express')
const jwt = require("jsonwebtoken");

const JWT_SECRET = "priyasharma"
const app = express();
//add middleware 
app.use(express.json())
const users = [];

function login(req,res,next){
    console.log(req.method + " req came");
    next();
}
app.post("/signup", function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username:username,
        password:password
    })
    res.json({
       Message: "User created successfully"    
    })
})
 
app.post("/signin",login, (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    let foundUser = null;

    for(let i=0 ;i<users.length;i++){
        if(users[i].username==username && users[i].password == password ){
          foundUser = users[i]  
        }
    }

    if(foundUser){
         const token = jwt.sign({
            username: username ,
         },JWT_SECRET);

         res.json({
            token: token
         })
    }
    else{
        res.json({
            message: "User not found  "
        })
    }
})

function auth(req,res,next){
     const token = req.headers.token;
     const decode = jwt.verify(token , JWT_SECRET);

     if(decode.username){
        req.username = decode.username;
        next()
     }
     else{
        res.json({
            message: "Invalid token"
        })
     }
}
app.get("/me",login,auth, function(req,res){

         let foundUser = null;

         for(let i =0;i<users.length;i++){
            if(users[i].username==req.username){
                foundUser = users[i];
            }
         }

         res.json({
            username: foundUser.username
         })
    }

) 
app.listen(6000)