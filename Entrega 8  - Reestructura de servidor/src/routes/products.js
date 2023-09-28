import { Router } from "express"
import { vali } from "../middleware/validation.js"
import ProductsController from "../controllers/productsController.js"

const router = Router()

const productsController = new ProductsController

router.get('/', productsController.getProducts)

router.get('/:pid', productsController.getProductById)

router.post('/', vali, productsController.addProduct)

router.put('/:pid', vali, productsController.updateProduct)

router.delete('/:pid', productsController.delete)

export default router