const express = require("express");
require('dotenv').config({path: "../.env"});
const bodyParser = require("body-parser");
const path=require("path");
const environment = require("../environment");
const mongoose = require("./config/mongoose");
const routes = require("./app/routes/routes");
const logger=require("./config/logger");

const env = process.env.NODE_ENV;
const envconfig = environment[env];
const port = envconfig.port || 3001;
const app = express();
mongoose.connect(envconfig, env);
app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const viewsPath = path.join(__dirname, "views/");
app.set('views', viewsPath);
app.use('/', routes);
app.listen(port, () => {
    console.log(`server running on port ${port}`);
    logger.info(`server running on port: ${port}`);
});



