const express = require('express');
const db = require('../connection');

const Usercontroller = {

    //Get all users
    getUsers : async (req,res)=>{
       db.query('select * from users', (error, result) => {
            if (error) {
                throw error;
            } else {
                res.json(result);
            }
        });
    },

    //Get user by id
    getUserById : async (req, res) =>{
        const {id} = req.params;
        db.query('select * from user where id=?',[id], (error, result) => {
            if (error) {
                throw error;
            } else {
                res.json(result[0]);
            }
        })
    }
}

module.exports = Usercontroller;