const mongoose = require('mongoose');
const { Schema } = mongoose;

const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    },
    logo: {
        type: String
    }
});

const Brand = mongoose.model('brand', brandSchema);

module.exports = {
    brandSchema,
    Brand
}