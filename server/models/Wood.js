const mongoose = require('mongoose');
const { Schema } = mongoose;

const woodSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    }
});

const Wood = mongoose.model('wood', woodSchema);

module.exports = {
    woodSchema,
    Wood
}