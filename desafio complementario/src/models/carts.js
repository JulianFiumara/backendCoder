import { Schema, model } from "mongoose";

const cartCollection = 'carts'

const cartSchema = Schema({
    products: {
        type: Array,
        required: true
    }
})

export default model(cartCollection, cartSchema)