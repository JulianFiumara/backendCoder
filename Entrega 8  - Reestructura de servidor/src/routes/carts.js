import { Router } from "express"
import { MongoCartManager } from "../dao/mongo/MongoCartManager.js"
import CartsController from "../controllers/cartsController.js"

const router = Router()

const cartsController = new CartsController

router.post('/', cartsController.createCart)

router.get('/:cid', cartsController.getCartProducts)

router.post('/:cid/product/:pid', cartsController.newProduct)

router.delete('/:cid/product/:pid', cartsController.deleteProduct)

router.put('/:cid/product/:pid', cartsController.uploadProduct)

router.delete('/:cid', cartsController.deleteCartProducts)

router.put('/:cid', cartsController.arrayProductsUpdate)

export default router