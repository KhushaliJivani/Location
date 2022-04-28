const Mongoose = require("mongoose");
const productSchema = new Mongoose.Schema({
    productName:{
        type:String,
    },
    locationId: {
        type:Mongoose.Schema.Types.ObjectId,
        ref:'location',
    },
}, {
    timestamps: true,
})
const product = new Mongoose.model("product", productSchema);
module.exports = product;

