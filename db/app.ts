import "reflect-metadata"; // this shim is required
import { createExpressServer, useContainer } from "routing-controllers";
import{ mongoose } from "./config";
import { queController } from "./controller/questionCtrl";
import { subController } from "./controller/subjectCtrl";
import { topicController } from "./controller/topicCtrl";
import { testController } from "./controller/testtemplateCtrl";
import { studController } from "./controller/studentCtrl";

import express = require("express");
var cors = require('cors');

const app = createExpressServer({
    controllers: [ subController ,topicController ,queController ,testController,studController]
  });

//CORS middleware
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
 
    next();
 }
 
 
 app.use(allowCrossDomain);
 app.use(express.static('uploads'));
  // run express application on port 4000
app.listen(4000);
console.log("Listening to prot 4000");