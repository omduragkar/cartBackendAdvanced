const { Schema, default: mongoose } = require("mongoose");
const { ADMIN, USER } = require("../constants/type");


/**
 * @description: This is the user schema for the API
 */


const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    cart:[{
        type:Schema.Types.ObjectId,
        ref:"CartItem"
    }
    ],
    role:{
        type:String,
        enum:[ ADMIN, USER],
        default:USER
    },
    cartBillAmount:{
        type:Number,
        default:0
    },
    cartTax:{
        type:Number,
        default:0
    },
    cartTotalAmount:{
        type:Number,
        default:0
    },
    orders:[{
        type:Schema.Types.ObjectId,
        ref:"Order"
    }]
}, {
    timestamps: true,
    
});


const User = mongoose.model('User', UserSchema);

module.exports = User;