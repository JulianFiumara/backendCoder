import { Router } from "express"
import { ProductManager } from "../productManager.js"
import { CartManager } from "../cartManager.js"

const router = Router()

const productManager = new ProductManager
const cartManager = new CartManager


router.post('/', async (req, res) => {
    await cartManager.createCart()          // se crea un nuevo carrito {id, products: []}
    res.send({mensaje: "carrito creado"})
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params              // se recibe cid de los parametros
    
    try {
        let arrPC = []
        const cartProducts = await cartManager.getCartProducts(cid)     // se guarda en carProducts el arreglo de productos del carrito cuyo id sea igual a cid
    
        await cartProducts.forEach(async (element) => {                 // se recorre cartProducts 
            try {
                let product = await productManager.getProductById(element.id)   // se guarda en product el producto entero

                product.quantity = element.quantity
                arrPC = [...arrPC, product]             // se guardan todos los productos en arrPC

                if(cartProducts.length == arrPC.length) res.send(arrPC)     // cuando se haya terminado de recorrer el arreglo respondemos a la peticion con arrPC
            } catch (error) {
                console.log(error)
            }
        })
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params         // se reciben cid, pid de los parametros

    try {
        await cartManager.uploadProduct(cid, pid)   // se sube el producto al carrito
        res.send({mensaje: "producto agregado al carrito"})
    } catch (error) {
        console.log(error)
    }
})

export default router