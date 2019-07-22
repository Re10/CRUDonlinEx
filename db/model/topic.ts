import{ mongoose } from "../config";
import { Document , Schema } from "mongoose";

const topicSchema: Schema = new Schema({
    subjectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subject"
    },
    topicName:String

});

export class topic extends mongoose.model("topic",topicSchema){}