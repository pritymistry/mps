const express=require('express')
const router=express.Router()
const { Users } = require("../models")
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { ValidateToken } = require('../middleware/AuthMiddleware')

router.post('/signup', async(req, res) => {
    try{
        const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password,10);

    await Users.create({
        username:username,
        email:email,
        password:hash
    });

    res.json({message:'success'});
    }catch(error){
        res.status(400).json({error:error.message});
    }
})
router.get("/all",async(req,res)=>{
    const allUSers=await Users.findAll();
    res.json(allUSers)
})

router.post("/signin", async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await Users.findOne({ where: { email: email } })
        if (!user) return res.status(400).json({ error: "user not exist" });

        const match = await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json({error:"inValid email or password."});

        const accessToken=sign({
            email:user.email,
            id:user.id,
        },"jwtToken");

        res.json({
            token:accessToken,
            email:email,
            id:user.id,
            username:user.username
        });
    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
})

module.exports = router