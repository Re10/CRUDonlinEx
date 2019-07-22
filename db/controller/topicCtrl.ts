import { JsonController, Body, Post, Req, Res, UploadedFile, Put, Get, Params, Param, Delete } from "routing-controllers";
import { topic } from "../model/topic";
import { sub } from "../model/subject";
import { response } from "express";
import * as mongo from 'mongodb';

@JsonController()
 
 export class topicController {
     @Post("/addtopic")
     addTopic(@Body() record:any ,@Res() response:any) {
        console.log("Recorderer:",record);
        console.log("Within topic Controller:",record[0],record[1]);
        console.log("Record Id:",record[0].id)
        console.log("Record topicName:",record[1].topicName)
        var recordData={
            subjectId: record[0].id,
            topicName:record[1].topicName
        }
        async function addTopic(){
            var res= await topic.findOne({topicName:recordData.topicName});
            if(res){
            console.log("Topic Name Allready Present: ",res);
            }else{
            var result= await topic.collection.insertOne(recordData)
             console.log(result);
             response.json({result});
            }

        } 
        return addTopic();
    }
        @Get("/listtopic")
        listTopic(@Body() record: any,@Res() response:any) {
           var result;
           async function listTopic(){
                result= await topic.find()
                                   .populate('subjectId');
                console.log("LIST TOPIC",result);
                response.json({result});
                
           } 
          return listTopic();
          }
         

          @Delete("/deletetopic/:id")
          deleteTopic(@Param ("id") id: number,@Body() record: any,@Res() response:any) {
           console.log("within remove function");
           var topicid = new mongo.ObjectID(id);
           console.log("SubjectId",topicid);
             var result;
             async function deleteTopic(){
                  result= await topic.deleteOne({_id:topicid});
                  console.log(result);
                  response.json({result});
                  
             } 
            return deleteTopic();
            }
            @Get("/edittopic/:id")
            editTopic(@Param ("id") id: number ,@Body() record: any,@Res() response:any) {
               var result;
               var topicid = new mongo.ObjectID(id);
               async function editTopic(){
                    result= await topic.findById({_id:topicid}).populate('subjectId');
                    console.log("LIST TOPIC",result);
                    response.json({result});
                    
               } 
              return editTopic();
              }
              @Put("/updatetopic/:id")
              updateTopic(@Param ("id") id:number ,@Body() record :any ,@Res() response:any){
                  console.log("Record=ID",record,id);
                  var topicid = new mongo.ObjectID(id);
                  async function updateTopic(){
                     var data =await topic.collection.updateOne({_id:topicid},{$set:{topicName:record.topicName}});
                    console.log("++++++++",data);
                     response.json({data});
                  }
                  return updateTopic();
              }
}

