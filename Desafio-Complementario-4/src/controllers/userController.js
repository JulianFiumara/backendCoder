import jwt from 'jsonwebtoken'
import { request } from "express"
import { createHash, isValidPassword } from "../ultis/bcrypt.js"
import UserService from "../services/userService.js"
import config from '../config/env.js';

const userService = new UserService

class UserController{
    rollSwitch = async (req = request, res) => {
        const {uemail} = req.params
        try {
            let user = await userService.getUser(uemail)
            if (!user) res.send({status: 'error', message: 'El usuario no existe'})

            req.session.premium = !req.session.premium

            let newUser = await userService.updateRoll(uemail, `${req.session.premium ? 'premium' : 'user'}`)
            console.log(req.session.premium)
            res.send({status: 'ok', data: newUser})
            
        } catch (error) {
            
        }
    }

    changePassword = async (req = request, res) => {
        const { email, password } = req.body

        try {
            console.log('email: ', email)
            let user = await userService.getUser(email)

            console.log('user: ', user)
            if (isValidPassword(user, password)) res.send('no puede colocar la contraseña anterior')
            console.log('logre pasar')
            await userService.updateUser(email, createHash(password))
            res.send({message: 'contraseña cambiada'})
        } catch (error) {
            console.log(error)
        }
    }

    renderChangePassword = async (req = request, res) => {
        const {token} = req.params
        try {
            jwt.verify(token, config.privateKey, (error)=>{
                if(error){
                    res.redirect('http://localhost:8080/api/mail')
                }
                res.render('changePassword')
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default UserController