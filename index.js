const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())
const posts=[
    {
        name:"sai",
        title:"sai title"
    },
    {
        name:"sai1",
        title:"sai1 title"
    },
    {
        name:"sai2",
        title:"sai2 title"
    }
    
]
app.post('/',(req,res)=>{
    const username = req.body.name
    var token = jwt.sign({ name:username }, 'secret');
    
    res.send(token)
})

app.get('/post', (req, res) => {
    const auth = req.headers['auth'];
    
    if (!auth) {
        return res.status(401).send("Authentication token is missing.");
    }
    
    const token = auth.split(" ")[1];
    try {
        const verified = jwt.verify(token, 'secret');
        console.log(verified)
        res.send(posts.filter(post => post.name === verified.name)); 
    } catch (error) {
        return res.status(401).send("Invalid token");
    }
});


app.listen(4000,()=>{console.log("helllo fron 4k")})

