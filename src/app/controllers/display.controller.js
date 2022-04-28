const location=require("../models/locations");
const product=require("../models/products");
exports.mainPage=async(req,res)=>{
    try{
        const locations=await location.aggregate([{$match:{parentId:null}}]);
        res.render('index',{locations});
    }catch(err){
        res.status(400).send({message:err.message});
    }   
}
exports.addProduct=async(req,res)=>{
    try{
        const locations=await location.aggregate([{$sort:{stage:1}}]);
        res.render('addProduct',{locations});
    }catch(err){
        res.status(400).send({message:err.message});
    }
}
exports.addLocation=(req,res)=>{
    res.render('addLocation');
}
exports.backData=async(req,res)=>{
    try{
    const id=req.params.id;
    const data=await location.findOne({_id:id});
    if(data.parentId==null){
        const locations=await location.aggregate([{$match:{parentId:null}}]);
        res.render('index',{locations});
    }
    else{
        const data=await location.findOne({_id:id});
        const locationToDisplay=await location.findOne({_id:data.parentId});
        const subLocation=await location.find({parentId:locationToDisplay._id});
        const productUnderLocation=await product.find({locationId:locationToDisplay._id});
        res.render('subLocation',{locationToDisplay,subLocation,productUnderLocation});
        }
    }catch(err){
        res.status(400).send({message:err.message});
    }
}