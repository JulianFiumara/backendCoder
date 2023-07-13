import { Router } from "express"
import { ProductManager } from "../productManager.js"

const router = Router()

const productManager = new ProductManager

router.get('/', async (req, res)=>{
    const {limit} = req.query       // se recibe limit del query

    try {
        const data = await productManager.getProducts()     // se guarda en data todos los productos

        limit ? res.send(data.filter(product => product.id <= limit)) : res.send(data)  // de especificar un limit se respondera esa cantidad de producto de no ser asi de devolderan todos
    } catch (error) {
        console.log(error)
    }
})

router.get('/:pid', async (req, res)=>{
    const {pid} = req.params        // se recibe pid de los parametros

    try {
        const data = await productManager.getProducts()     // se guarda en data todos los productos

        pid ? res.send(data.find(product => product.id == pid)) : res.send(data)    // de especificar el id, se devoldera ese producto en especifico sino se devolderan todos
    } catch (error) {
        console.log(error)
    }
})

router.post('/',async (req, res)=>{
    const   {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail
            } = req.body        // se reciben todos los valores del body

    // se verifica que todos los datos sean validos
    if (title == '' || description == '' || code == '' || price == '' || status == '' || stock == '' || category == '') {
        res.send({aviso: "datos invalidos"})      // de no ser asi se respondera con este mensaje  {aviso: "datos invalidos"}
    }else{
        try {
            await productManager.addProduct(title, description, price, thumbnail, code, stock, status, category)    // de ser validos los datos, se agregara el producto
            res.send({aviso: "producto agregado"})
        } catch (error) {
            console.log(error)
        }
    }
})

router.put('/:pid',async (req, res)=>{
    const {pid} = req.params
    const   {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail
            } = req.body        // se reciben todos los valores del body

    // se verifica que todos los datos sean validos
    if (title == undefined || description == undefined || code == undefined || price == undefined || status == undefined || stock == undefined || category == undefined) {
        res.send({mensaje: "datos invalidos"})      // de no ser asi se respondera con este mensaje  {aviso: "datos invalidos"}
    }else{
        let  obj =  {
                        title,
                        description,
                        code,
                        price,
                        status,
                        stock,
                        category,
                        thumbnail
                    }
        try {
            await productManager.updateProduct(pid, obj)        // se actuliza al producto
            res.send({aviso: "producto actualizado"})
        } catch (error) {
            console.log(error)
        }
    }
})

router.delete('/:pid',async (req, res)=>{
    const {pid} = req.params        // se recibe pid de los parametros
    
    try {
        await productManager.deleteProduct(pid)     // se elimina al producto
        res.send({aviso: "producto eliminado"})
    } catch (error) {
        console.log(error)
    }
})

export default router