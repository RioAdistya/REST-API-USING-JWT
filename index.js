const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./verif-token');
const port = 5000;

const app = express();
app.use(express.json())

app.get("/api", (req, res) => {
    res.json({
        message: "welcome to my app"
    });
});

app.post('/api/login',(req,res)=>{

    const user = {
        id:1,
        username: "Rio Adistya Saputra",
        userEmail:'rioadistya@gmail.com',
        password:'1234567'
    }

    jwt.sign({user},'secretkey',(err,token)=>{
        res.json({
            token
        })
    })
})

app.get('/api/user',verifyToken,(req,res)=>{

    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err)
            res.status(403).json({message: 'invalid token'})
        else{
            res.json(authData)          
        }
    })
});

app.listen(port, () => {
    console.log('server is listening on port', port);
});