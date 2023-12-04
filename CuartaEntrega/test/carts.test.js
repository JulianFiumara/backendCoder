import mongoose from 'mongoose'
import CartsService from '../src/services/cartsService.js'
import chai from 'chai'
import supertest from 'supertest'

mongoose.connect('mongodb+srv://MaitaJv:qpwo_1029@cluster0.asmvudf.mongodb.net/ecommerce?retryWrites=true&w=majority')

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Carts Dao', ()=>{
    before(function(){
        this.cartsService = new CartsService
    })
    beforeEach(function(){
        this.timeout(5000)
    })
    it('Nuestro dao debe poder crear un carrito nuevo', async function(){
        const {
            statusCode,
            ok,
            _body
        } = await requester.post('/api/carts')

        // console.log(_body.payload)
        expect(typeof _body.payload, 'object').to.be.ok
    })
    it('Nuestro dao debe poder agregar productos al carrito', async function(){
        const {
            statusCode,
            ok,
            _body
        } = await requester.post('/api/carts/6429d8f5b18ff58f00f84e14/product/64821e25fd1952e6cd208b1a')

        console.log(_body)
        expect(typeof _body.data, 'object').to.be.ok
    })
    it('Nuestro dao debe poder eliminar productos del carrito', async function(){
        const {
            statusCode,
            ok,
            _body
        } = await requester.delete('/api/carts/6429d8f5b18ff58f00f84e14/product/64821e25fd1952e6cd208b1a')

        console.log(_body)
        expect(typeof _body.data, 'object').to.be.ok
    })
})