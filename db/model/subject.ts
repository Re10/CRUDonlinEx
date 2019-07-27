import{ mongoose } from "../config";
import {Schema } from "mongoose";

const subjectSchema: Schema = new Schema({
   
    subjectName:String
})
export class sub extends mongoose.model("subject",subjectSchema){
     static pre: any;
}
    
   
