var mongoose=require("mongoose");
const location=require("../models/locations");
const product=require("../models/products");
exports.productAdd=async(req,res)=>{
    try{
        const productName=req.body.addProduct;
        const productLocation=req.body.location;
        const productStored= new product({
                productName:productName,
                locationId:productLocation,
            })
            const storedData=await productStored.save();
            const locations=await location.aggregate([{$match:{parentId:null}}]);
            res.render('index',{locations});
        
    }catch(err){
        res.status(400).send(err.message);
    }
}
