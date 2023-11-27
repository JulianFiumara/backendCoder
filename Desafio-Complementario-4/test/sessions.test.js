import mongoose from 'mongoose'
import UserService from '../src/services/userService.js'
import chai from 'chai'
import supertest from 'supertest'

mongoose.connect('mongodb+srv://MaitaJv:qpwo_1029@cluster0.asmvudf.mongodb.net/ecommerce?retryWrites=true&w=majority')

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Sessions Dao', ()=>{
    before(function(){
        this.userService = new UserService
    })
    beforeEach(function(){
        this.timeout(5000)
    })
    it('Nuestro dao debe poder obtener un usuario por email', async function(){
        let UserMock = {
            username: 'javiermaita@hotmail.com.ar',
            password: '1234'
        }
        const {
            statusCode,
            ok,
            _body
        } = await requester.post('/auth/login').send(UserMock)
        // console.log('statusCode', statusCode)
        // console.log('ok', ok)
        // console.log('body', _body)
        expect(typeof _body, 'object').to.be.ok
    })
    it('Nuestro dao debe poder cambiar de contraseña', async function(){
        let UserMock = {
            email: 'j3@gmail.com',
            password: 'password.ñalsjgieñsldkgeASF235sd'
        }
        const {
            statusCode,
            ok,
            _body
        } = await requester.post('/api/users/changePassword').send(UserMock)

        // console.log(_body)
        expect(typeof _body, 'object').to.be.ok
    })
    it('Nuestro dao debe poder cambiar de roll', async function(){
        const {
            statusCode,
            ok,
            _body
        } = await requester.get('/api/users/premium/j3@gmail.com')
        console.log(_body.data)
        expect(typeof _body, 'object').to.be.ok
    })
})