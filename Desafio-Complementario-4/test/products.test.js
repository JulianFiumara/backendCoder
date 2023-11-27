import mongoose from 'mongoose'
import ProductsService from '../src/services/productsService.js'
import chai from 'chai'
import supertest from 'supertest'

mongoose.connect('mongodb+srv://MaitaJv:qpwo_1029@cluster0.asmvudf.mongodb.net/ecommerce?retryWrites=true&w=majority')

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Products Dao', ()=>{
    before(function(){
        this.productsService = new ProductsService
    })
    beforeEach(function(){
        this.timeout(5000)
    })
    it('Nuestro dao debe poder obtener un array con 10 productos', async function(){
        const {
            statusCode,
            ok,
            _body
        } = await requester.get('/api/products')
        expect(Array.isArray(_body)).to.be.ok
    })
    it('Nuestro dao debe poder obtener un unico producto', async function (){
        const {
            statusCode,
            ok,
            _body
        } = await requester.get('/api/products/64010a6571f4e310587dbb00')
        // console.log(_body);
        expect(typeof _body, 'object').to.be.ok
    })
    it('Nuestro dao debe poder agregar un producto', async function (){
        let ProductMock ={
            owner: 'admin',
            title: 'TEST',
            description: 'TEST',
            code: 600,
            price: 1500,
            status: 'true',
            stock: 4,
            category: 'mails',
            thumbnail: 'link',
        }

        const {
            statusCode,
            ok,
            _body
        } = await requester.post('/api/products').send(ProductMock)

        console.log('hola statusCode', statusCode)
        console.log('hola ok', ok)
        console.log('hola _body', _body)
        expect(_body._id).to.be.ok
    })
})