const express = require('express');
const userRouter = express.Router();
const db = require('../connection');


userRouter.get('/getUsers', (req,res)=>{
db.query('select * from users', (error, results) => {
    if (error) {
        throw error;
    } else{
        res.json(results)
    }
});
});

module.exports = userRouter;