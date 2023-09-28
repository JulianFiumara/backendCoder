import { Router } from "express"
import { auth } from "../middleware/auth.js"
import ViewsController from "../controllers/viewsController.js"

const viewsController = new ViewsController

const router = Router()

router.get('/products', auth, viewsController.productsRender)

router.get('/carts/:cid', viewsController.cartsRender)

router.get('/realtimeproducts', viewsController.realTimeProductsRender)

router.get('/chat', viewsController.chat)

export default router