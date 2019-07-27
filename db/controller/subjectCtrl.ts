import { JsonController, Body, Post, Req, Res, UploadedFile, Put, Get, Params, Param, Delete } from "routing-controllers";
import { sub } from "../model/subject";
import { topic } from "../model/topic";
import { response } from "express";
import * as mongo from 'mongodb';
import { que } from "../model/question";
import { test } from "../model/testtemplate";


@JsonController()
export class subController {
     @Post("/addsubject")
     addSub(@Body() record: any, @Res() response: any) {
          // console.log(record);
          // console.log("IDDDDDDDDDDD========>",record.subName);
          var result;
          var res: any;
          async function addSub() {
               res = await sub.findOne({ subName: record.subName });
               if (res) {
                    console.log("Subject Name Allready Present: ", res);
               } else {
                    result = await sub.collection.insertOne(record)
                    console.log(result);
                    response.json({ result });
               }

          }
          return addSub();
     }
     @Get("/listsubject")
     listSub(@Body() record: any, @Res() response: any) {
          var result;
          async function listSub() {
               result = await sub.find();
               response.json({ result });

          }
          return listSub();
     }
     @Delete("/deletesubject/:id")
     deleteSub(@Param("id") ids: number, @Body() record: any, @Res() response: any) {
          console.log("within remove function");
          var subid = new mongo.ObjectID(ids);
          console.log("SubjectId", subid);
          var result;
          async function deleteSub() {
               // var Q= await que.deleteMany({topic:_id}).populate('topic');
               var top = await topic.find({ subjectId: subid }).populate('subjectId');
               console.log("Topics:", top);

               for (let i = 0; i < top.length; i++) {
                    console.log("tOPIC is Topics:", top[i]._id);
                    var quest = await que.find({ topic: top[i]._id }).populate('topic');
                    console.log("qUESTIONS is QUETSION", quest);  
                    // var tests = await test.find({ 'questions.question': quest[i]._id })
                    // var testtemp = await test.deleteMany({ 'questions.question': quest[i]._id });
                    // console.log("Deleted Testtttt:", testtemp);
                    var Q = await que.deleteMany({ topic: top[i]._id });
                    console.log("Deleted Questionssss:", Q);

               }
               var t= await topic.deleteMany({subjectId:subid});
               console.log("Question is:",t);
               result= await sub.deleteOne({_id:subid});
               console.log(result);

               response.json({result});

          }
          return deleteSub();
     }

}
