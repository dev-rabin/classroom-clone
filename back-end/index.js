const express = require('express');
const app = express();
const port = 4000;
const db = require('./src/connection');




app.listen(port, ()=>{
    console.log(`Server starting at ${port}`);
});

app.get('/user', (req, res)=> {
    db.ping((error)=>{
        if(error){
        return res.send("My server is down");
        } else{
            res.send("Server is connected");
        }
    })
});
const userRouter = require('./src/routes/user_routes');
app.use('/api/user', userRouter);