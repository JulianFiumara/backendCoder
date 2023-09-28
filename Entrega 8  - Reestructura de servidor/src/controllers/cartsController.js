import { request } from "express";
import CartsService from "../services/cartsService.js";

const cartsService = new CartsService

class CartsController {
    createCart = async (req = request, res) => {
        await cartsService.createCart()

        res.send({mensaje: "carrito creado"})
    }

    getCartProducts = async (req = request, res) => {
        const { cid } = req.params
        const {limit = 1 , page = 1, query} = req.query
        try {
            const cartProducts = await cartsService.getCartProducts(cid, limit, page)
            
            res.send(cartProducts)
        } catch (error) {
            console.log(error)
        }
    }

    newProduct = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.uploadProduct(cid, pid)

            res.send({mensaje: "producto agregado al carrito"})

        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.deleteProduct(cid, pid)

            res.send({mensaje: "producto eliminado del carrito"})

        } catch (error) {
            console.log(error)
        }
    }

    uploadProduct = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.uploadProduct(cid, pid)

            res.send({mensaje: "producto agregado al carrito"})

        } catch (error) {
            console.log(error)
        }
    }

    deleteCartProducts = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.deleteCartProducts(cid)

            res.send({mensaje: "todos los productos eliminados del carrito"})

        } catch (error) {
            console.log(error)
        }
    }

    arrayProductsUpdate = async (req = request, res) => {
        const { cid } = req.params
        const data = req.body

        try {
            await cartsService.arrayProductsUpdate(cid, data)

            res.send({mensaje: "Array de productos agregado al carrito"})

        } catch (error) {
            console.log(error)
        }
    }
}

export default CartsController