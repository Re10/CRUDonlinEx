import { JsonController, Body, Post, Req, Res, UploadedFile, Put, Get, Params, Param, Delete } from "routing-controllers";
import { test } from "../model/testtemplate";

import { response } from "express";
import { any } from "../../onlineexams/angular/angular-ui-router";
import * as mongo from 'mongodb';
import * as mongoose from "mongoose";
@JsonController()

export class testController {
    @Post('/addtest')
    addTest(@Body() record: any, @Res() response: any) {
        // console.log("record::", record);
        // console.log("questions id:", record.question);
        // console.log("right:", record.rightmarks);
        // console.log("wrong:", record.wrongmarks);
        async function addTest() {
            var data = await test.findOne({ name: record.name });
            
            if (data) {
                console.log("test Name already present:");
            }
            else {
                var que=[];
                for (let i = 0; i < record.question.length; i++) {
                    var quetionID=new mongoose.Types.ObjectId(record.question[i]);

                   que[i] = {
                        question:  quetionID,
                        rightmarks: record.rightmarks[i],
                        wrongmarks: record.wrongmarks[i]
                    }
                  
                }
                    var detailtest = {
                        name: record.name,
                        description: record.description,
                        questions:que,
                        totalmarks: record.totalmarks,
                        passingscore: record.passingscore,
                        duration: record.duration,
                        status: record.status
                    }
                 
                    var result=await test.collection.insertOne(detailtest);
                    response.json({result});
                }
               
            
        }
        return addTest();


    }
    @Get('/listtest')
    listTest(@Body() record: any, @Res() response: any) {
        //console.log("record:",record);
        async function listTest() {
            var result = await test.find();
            response.json({ result });
        }
        return listTest();
    }

    @Get("/edittest/:id")
    getOneTest(@Param("id") id: any, @Body() record: any, @Res() response: any) {
        // console.log("Within LIST ONE TEST");
        var testid = new mongo.ObjectID(id);
        // console.log("Id======>", testid);

        async function getOneTest() {
            var result = await test.findById({ _id: testid}).populate({ path:'questions.question' , select:'queText'});
            // console.log("Result:", result);
            response.json({result});
            //  return result;
        }
        return getOneTest();
    }
    @Put("/updatetest/:id")
    updateTest(@Param ("id") id:number ,@Body() record:any ,@Res() response:any){
        var testid=new mongo.ObjectID(id);
        // console.log("Question id:",testid);
        // console.log("RECORDD:::::",record);
         async function updateTest(){
            var que=[];
            var quetionID=[];
            console.log("RECORDD:::::",record.questions.length);
            for (let i = 0; i < record.questions.length; i++) {
                quetionID[i]=new mongoose.Types.ObjectId(record.questions[i].question);
               que[i] = {
                    question:  quetionID[i],
                    rightmarks: record.questions[i].rightmarks,
                    wrongmarks: record.questions[i].wrongmarks
                }              
            }
            console.log(que)
                var detailtest = {
                    name: record.name,
                    description: record.description,
                    questions:que,
                    totalmarks: record.totalmarks,
                    passingscore: record.passingscore,
                    duration: record.duration,
                    status: record.status
                }
          var result=await test.collection.updateOne({_id:testid},{$set:detailtest});
        //   console.log("Result Updated ==========>",result);
          response.json({result});
         }
        return updateTest();
    }
    @Delete("/deletetest/:id")
  deleteTest(@Param("id") id:number, @Body() record:any ,@Res() response:any){
      console.log("Id:",id);
      var testid=new mongo.ObjectID(id);
      async function deleteTest(){
          var result=await test.deleteOne({_id:testid});
        //   console.log("result;",result);
          response.json({result});
      }
      return deleteTest();
  }
  @Get('/listtestpublish')
  listTestPublish(@Body() record: any, @Res() response: any) {
      //console.log("record:",record);
      async function listTestPublish() {
          var result = await test.find({'status':'Publish'}).populate('questions.question');
          console.log("Resultttttt=>",result);
          response.json({ result });
      }
      return listTestPublish();
  }
}


