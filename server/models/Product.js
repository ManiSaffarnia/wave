const mongoose = require('mongoose');
const { Schema } = mongoose;


const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        maxlength: 300
    },
    price: {
        type: Number,
        required: true,
        maxlength: 10
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'brand',
        required: true
    },
    wood: {
        type: Schema.Types.ObjectId,
        ref: 'wood',
        required: true
    },
    shipping: {
        type: Boolean,
        required: true,
    },
    available: {
        type: Boolean,
        required: true
    },
    frets: {
        type: Number, //20 - 22 - 24
        required: true
    },
    sold: {
        type: Number,
        required: true,
        maxlength: 5,
        default: 0
    },
    publish: {
        type: Boolean,
        required: true
    },
    images: {
        type: Array,
        default: []
    },
}, { timestamps: true });

const Product = mongoose.model('product', productSchema);

module.exports = {
    productSchema,
    Product
}