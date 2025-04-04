const express = require('express')
const jwt = require("jsonwebtoken");

const JWT_SECRET = "priyasharma"
const app = express();
//add middleware 
app.use(express.json())
const users = [];
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

app.post("/signin", (req,res)=>{
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

app.get("/me", function(req,res){

})
app.listen(6000)