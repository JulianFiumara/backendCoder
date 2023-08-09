import productsModel from "../../models/products.js"

export class MongoProductManager{

    async addProduct(title, description, price, thumbnail, code, stock, status, category){
        try {
            await productsModel.create({title, description, price, thumbnail, code, stock, status, category})
        } catch (error) {
            console.log(error)
        }
    }

    async getProducts(limit){
        try {
            let products = await productsModel.find()
            if (!limit) {
                return products
            }
            return products = await productsModel.find().limit(limit)
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(pid){
        try {
            const data = await productsModel.find()
    
            return data.find(product => product.id == pid)
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(pid, obj){
        try {
            await productsModel.findOneAndReplace({_id: pid}, obj)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(pid){
        try {
            await productsModel.findOneAndDelete({_id: pid})
        } catch (error) {
            console.log(error)
        }
    }
}