import{ mongoose } from "../config";
import { Document , Schema } from "mongoose";
import { text } from "body-parser";

const testSchema: Schema = new Schema({
    name:String,
    description:String,
    questions:[{
        question:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'question'
        },
        rightmarks:Number,
        wrongmarks:Number
    }],
    totalmarks:Number,
    passingscore:Number,
    duration:Number,
    status:{
        type:String,
        enum:['Draft','Publish']
    }



})
export class test extends mongoose.model("testtemplate",testSchema){}