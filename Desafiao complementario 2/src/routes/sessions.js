import { Router } from "express";
import { MongoUserManager } from '../dao/mongo/MongoUserManager.js'

const router = Router()
const mongoUserManager = new MongoUserManager

router.get('/current', async (req, res) =>{

    try {
        let user = await mongoUserManager.getUser(req.session.email)
        console.log(user)
        res.send(user)
    } catch (error) {
        console.log(error)
    }
})

export default router