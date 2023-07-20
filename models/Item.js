const { Schema, default: mongoose } = require("mongoose");
const { PRODUCT, SERVICE } = require("../constants/type");

/**
 * @description: This is the item schema for the API
 * 
 */
const ItemSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:[PRODUCT, SERVICE],
        default:PRODUCT
    },
    price: Number,
    
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;