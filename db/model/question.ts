import{ mongoose } from "../config";
import { Document , Schema } from "mongoose";
import { text } from "body-parser";

const queSchema: Schema = new Schema({
    topic:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"topic"
    },
    queText:String,
    option:Array,
    type:String,
    correctAns:Array,
    solution: String,
    tag:Array

});

export class que extends mongoose.model("question",queSchema){}