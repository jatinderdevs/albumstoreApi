const mongoose = require('mongoose');

const schema = mongoose.Schema;

const albumschema = new schema({
    title: String,
    price: Number,
    stock: Number,
    desc: String,
    author: String,
    isAvaliable: Boolean,
    img: String,
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

module.exports = mongoose.model("album", albumschema);