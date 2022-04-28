const express=require("express");
const display=require("../controllers/display.controller");
const location=require("../controllers/location.controller");
const subLocation=require("../controllers/subLocation.controller");
const product=require('../controllers/product.controller');
const route=express.Router();
route.get('/',display.mainPage);//index page
route.get('/productAdd',display.addProduct);//add a product API
route.get('/locationAdd',display.addLocation);//add main location
route.get('/editLocation/:id',location.editLocation);// edit location
route.get('/deleteLocation/:id',location.deleteLocation);//delete location
route.get('/subLocation/:id/:stage',subLocation.displayLocation);
route.get('/SubLocationAdd/:id/:stage',subLocation.addLocation);
route.get('/back/:id',display.backData);

route.post('/editLocation/:id',location.modifyLocation);//edit location
route.post('/addLocation',location.addLocation);
route.post('/addSubLocation/:id/:stage',subLocation.addSubLocation);
route.post('/addProduct',product.productAdd);
//route.post('/addLocation/:id',subLocation.addSubLocation);

module.exports=route;