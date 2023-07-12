
import fs from 'fs'

export class ProductManager {
    #ruta = './products.json'
    constructor(){
        this.path = this.#ruta
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        try {

            if(fs.existsSync(this.path)){     //si el archivo existe se pushea el producto
                console.log("existe el archivo");
                let data = await fs.promises.readFile(this.path, 'utf-8') //data en JSON
                let dataJS = JSON.parse(data)                             //data en JS
    
                product.id = dataJS[dataJS.length - 1].id + 1             //agrego id
                dataJS.push(product)
    
                await fs.promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')        //se escribe en el archivo los productos en JSON
    
            }else{                           //si el archivo NO existe se crea uno
                product.id = 1
                const arrProducts = [product]
    
                await fs.promises.writeFile(this.path, `${JSON.stringify(arrProducts, null, 2)}`, 'utf-8')   //se crea el archivo con el producto en JSON
            }

        } catch (error) {
            console.log(error)
        }
    }

    async getProducts(){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let dataJS = JSON.parse(data)

            return dataJS
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let dataJS = JSON.parse(data)

            const productById = dataJS.find(product => product.id == id)
            
            return productById
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, obj){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let dataJS = JSON.parse(data)

            let productById = dataJS.find(product => product.id == id)

            productById = obj
            productById.id = id

            dataJS.splice((id - 1), 1, productById)


            await fs.promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let dataJS = JSON.parse(data)

            dataJS.splice((id - 1), 1)

            let contador = 1

            dataJS.forEach(product => {
                product.id = contador++
            })

            await fs.promises.writeFile(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')
        } catch (error) {
            console.log(error)
        }
    }
}