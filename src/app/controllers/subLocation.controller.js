const location = require("../models/locations");
const product=require("../models/products");
exports.displayLocation=async(req,res)=>{
    try{
        const mainLocationId=req.params.id;
        const locationStage=req.params.stage;
        const locationToDisplay=await location.findOne({_id:mainLocationId});
        const subLocation=await location.find({parentId:mainLocationId});
        const productUnderLocation=await product.find({locationId:mainLocationId});
        res.render('subLocation',{locationToDisplay,subLocation,productUnderLocation});
        }catch(err){
        res.status(400).send({message:err.message});
    }
}

exports.addLocation=(req,res)=>{
    const id=req.params.id;
    const stage=req.params.stage;
    res.render('addSubLocation',{id,stage});
}

exports.addSubLocation=async(req,res)=>{
    try{
        try{
        
            const mainLocationId=req.params.id;//parentId
            const locationStage=req.params.stage;//stage 1
            const newLocation=req.body.addSubLocation;//sublocation//1-1,1-2,1-3
            const data=await location.find({parentId:mainLocationId});
            const locationToDisplay=await location.findOne({_id:mainLocationId});
            if(data.length==0){
                 const i=1;
                 const newStage=`${locationStage+-i}`;
                 const locationStored= new location({
                            name:newLocation,
                            stage:newStage,
                            parentId:mainLocationId,
                        })
                    const storedData=await locationStored.save();
                    const subLocation=await location.find({parentId:mainLocationId});
                    const productUnderLocation=await product.find({locationId:mainLocationId});
                    res.render('subLocation',{locationToDisplay,subLocation,productUnderLocation});
            }else{
                const ans=await location.find({parentId:mainLocationId}).sort({_id:-1}).limit(1);
                let newStage=0;
                ans.forEach(ans=>{
                    newStage=ans.stage;
                })
                const lastChar=newStage.slice(-1);
                const secondStage=`${locationStage+-+(parseInt(lastChar)+1)}`;
                const locationStored= new location({
                    name:newLocation,
                    stage:secondStage,
                    parentId:mainLocationId,
                })
                const storedData=await locationStored.save();
                const subLocation=await location.find({parentId:mainLocationId});
                const productUnderLocation=await product.find({locationId:mainLocationId});
                res.render('subLocation',{locationToDisplay,subLocation,productUnderLocation});
            }
            }catch(err){
                res.status(400).send({message:err.message});
        
            }   
    }
    catch(err){
        res.status(400).send({message:err.message});
    }
}