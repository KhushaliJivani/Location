const location = require("../models/locations");
const product=require("../models/products");
exports.addLocation=async(req,res)=>{
    try{
        
    let newLocation=req.body.addLocation;
    const data=await location.find({}).sort({_id:-1}).limit(1);
    if(data.length==0){
        const i=1;
        const locationStored= new location({
            name:newLocation,
            stage:`${i}`,
        })
        const storedData=await locationStored.save();
        const locations=await location.aggregate([{$match:{parentId:null}}]);
        res.redirect('/');
    }else{
        const ans=await location.find({}).sort({_id:-1}).limit(1);
        let newStage=0;
        ans.forEach(ans=>{
            newStage=ans.stage;
        })
        const locationStored= new location({
            name:newLocation,
            stage:`${parseInt(newStage)+1}`,
        })
        const storedData=await locationStored.save();
        const locations=await location.aggregate([{$match:{parentId:null}}]);
        res.redirect('/');
    }
    }catch(err){
        res.status(400).send({message:err.message});

    }
}
exports.editLocation=async(req,res)=>{
    try{
            const locationId = req.params.id;
            const locationData = await location.findOne({
                _id: locationId
            });
            res.render('editLocation', {
                locationData
            });
        }catch(err){
        res.status(400).send({message:err.message});
    }
}
exports.modifyLocation=async(req,res)=>{
    let editLocationId=req.params.id;
    let newLocation=req.body.editLocation;
    try{
        const editData = await location.updateOne({
            _id: editLocationId
        }, {
            $set: {
                name:newLocation
            }
        });
        const data=await location.findOne({_id:editLocationId});
            if(data.parentId==null){
                const locations=await location.aggregate([{$match:{parentId:null}}]);
                res.render('index',{locations});
            }
            else{
                const data=await location.findOne({_id:editLocationId});
                const locationToDisplay=await location.findOne({_id:data.parentId});
                const subLocation=await location.find({parentId:locationToDisplay._id});
                const productUnderLocation=await product.find({locationId:locationToDisplay._id});
                res.render('subLocation',{locationToDisplay,subLocation,productUnderLocation});
            }
    }catch(err){
        res.status(400).send({message:err.message});

    }
}

exports.deleteLocation=async(req,res)=>{
    try{
        let deleteLocationId=req.params.id;
        const data=await location.findOne({_id:deleteLocationId});
        const stage=data.stage;
         const deleteChild=await location.deleteMany({parentId:data._id});   
        const deleteData=await location.deleteOne({
            _id:deleteLocationId
        })
        const deleteProductLocation=await product.deleteMany({locationId:data._id});
        if(data.parentId==null){
            const locations=await location.aggregate([{$match:{parentId:null}}]);
            res.render('index',{locations});
        }
        else{
            const data=await location.findOne({_id:deleteLocationId});
            const locationToDisplay=await location.findOne({_id:data.parentId});
            const subLocation=await location.find({parentId:locationToDisplay._id});
            const productUnderLocation=await product.find({locationId:locationToDisplay._id});
            res.render('subLocation',{locationToDisplay,subLocation,productUnderLocation});
        }
   }catch(err){
        res.status(400).send({message:err.message});
    }
}