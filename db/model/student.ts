import{ mongoose } from "../config";
import { Document , Schema } from "mongoose";
import { text } from "body-parser";
import { ObjectID } from "bson";

const studSchema: Schema = new Schema({
   title:String,
   description:String,
   testId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"testtemplate"
  },
  studentlist:[{
   name:String,
   email:String,
   pass:String,
   marks:[{
      mark:Number,
      status:String,
      correct:Array
      
   } ],
   
  }],
  date:Date

});

export class stud extends mongoose.model("student",studSchema){}