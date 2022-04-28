
const Mongoose = require("mongoose");
const product = require("./products");
const locationSchema = new Mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    stage:{
        type:String,
    },
    parentId:{
        type:Mongoose.Schema.Types.ObjectId,
        default:null,
    },
})
const location = new Mongoose.model("Location", locationSchema);
module.exports = location;



