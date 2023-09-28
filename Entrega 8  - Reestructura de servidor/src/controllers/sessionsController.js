import { request } from "express"
import SessionsService from "../services/sessionsService.js"

const sessionsService = new SessionsService

class SessionsController {
    current = async (req = request, res) => {
        try {
            let email = req.session.email
            let user = await sessionsService.getUser(email)
            console.log(user)
            res.send(user)
        } catch (error) {
            console.log(error)
        }
    }
}

export default SessionsController