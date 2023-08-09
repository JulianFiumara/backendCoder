import cartsModel from "../../models/carts.js"

export class MongoCartManager {

    async createCart(){
        try {
            await cartsModel.create({products: []})
        } catch (error) {
            console.log(error)
        }
    }

    async uploadProduct(cid, pid){
        try {
            let carrito = await cartsModel.findOne({cid: cid})
    
            let product = carrito.products.find(product => product.pid == pid)
    
            if (product !== undefined) {
                await cartsModel.updateOne(
                    {
                        cid: cid
                    },
                    {
                        $set:
                        {
                            'products.$[pid]': {'pid': pid, 'quantity': product.quantity + 1}
                        }
                    },
                    {
                        arrayFilters: 
                        [
                            {'pid.pid': pid}
                        ]
                    }
                )
            }
    
            if (product == undefined) {
                await cartsModel.findByIdAndUpdate(cid, {$push: {'products': {pid: pid, quantity : 1}}})
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getCartProducts(cid){
        try {
            const cartProducts = await cartsModel.findOne({_id: cid})
            return cartProducts
        } catch (error) {
            console.log(error)
        }
    }
}