import express from 'express'
const router = express.Router
import { User } from "../models/user.models.js";
import {randomBytes,createHac} from "crypto"
import { error } from 'console';

router.post(`/signup`,async(req,rep)=>{
    const{name,email,password} = req.body

    const existingUser = await User.findOne({
        email,
    })
    if (existingUser) {
        return rep.status(401).json({error:`user with this ${email} already exist`})
    }

    const salt = randomBytes(256).toString(`hex`)
    const hashedpassword = createHac('sha256',salt)
    .update(password)
    .digest('hex')

    const user = await User.insertOne({
        name,
        email,
        password:hashedpassword,
        salt,
    })
    rep.status(210).json({status:`success`,data:{id:user._id}})
})


export default router;