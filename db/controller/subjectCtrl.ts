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
                    //  console.log(result);
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
               var top = await topic.find({ subjectId: subid }).select('_id');
               console.log("Topics:", top);

               for (let i = 0; i < top.length; i++) {
                    console.log("tOPIC is Topics:", top[i]._id);
                    var quest = await que.find({ 'topic': top[i]._id }).select('_id topic queText ');
                    console.log("qUESTIONS is QUETSION", quest);
               }
               for (let i = 0; i < quest.length; i++) {
                    var tests: any = await test.find({ 'questions.question': quest[i]._id });
                    console.log("test template==>", tests);
                    console.log("id==============>>>>>", tests.length);
                    var del = await test.collection.updateMany({ 'questions.question': quest[i]._id }, { $pull: { questions: { question: quest[i]._id } } });
                    console.log("========>", del);
                    // var testtemp = await test.deleteMany({ 'questions.question': quest[i]._id });
                    // console.log("Deleted Testtttt:", testtemp);
                    var Quw = await que.find({ topic: top[i]._id });
                  
                    var Q = await que.deleteMany({ topic: top[i]._id });
                  
                    var t = await topic.deleteMany({ subjectId: subid });
                    // console.log("Question is:", t);
                    // console.log("before Subject deleted");
                    result = await sub.deleteOne({ _id: subid });
                    console.log(result);

               }
               //====================//
               for (let i = 0; i < tests.length; i++) {
                    for (let j = 0; j < tests[i].questions.length; j++) {
                         for (let k = 0; k < quest.length; k++) {
                              if (JSON.stringify(quest[k]._id) == JSON.stringify(tests[i].questions[j].question)) {
                                   console.log("tset Name==>", tests[i].name)
                                   //console.log("here is length of nbfvbfjkvbfkv:", tests[i]._id, "====", tests[i].questions[j].rightmarks, "-------", tests[i].totalmarks);
                                   tests[i].totalmarks = tests[i].totalmarks - tests[i].questions[j].rightmarks;
                                   console.log("Update total=====>", tests[i].totalmarks);
                                   var updatetot = await test.collection.updateMany({ '_id': tests[i]._id }, { $set: { 'totalmarks': tests[i].totalmarks } });
                                   console.log("Updated value is:", updatetot);

                              }
                         }
                    }
               }
               //=================//


               response.json({ result });

          }
          return deleteSub();
     }

}
