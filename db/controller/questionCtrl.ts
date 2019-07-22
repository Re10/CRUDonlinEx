import { JsonController, Body, Post, Req, Res, UploadedFile, Put, Get, Params, Param, Delete } from "routing-controllers";
import { que } from "../model/question";
import { topic } from "../model/topic";
import { sub } from "../model/subject";
import { response } from "express";
import * as mongo from 'mongodb';

@JsonController()
 
 export class queController {
     @Post("/addque")
     addQue(@Body() record: any ,@Res() response:any) {
        console.log(record);
        async function addQue(){
            var result= await que.collection.insertOne(record);
            console.log("Result==>",result);
            response.json({result});

        } 
        return addQue();     
       

}
@Get("/listque")
listQue(@Body() record: any,@Res() response:any) {

    console.log("WITHIN LIST OF QUESTION FUNCTION")
   var result;
   async function listQue(){
        result= await que.find().populate('topic');                         
        console.log("LIST Questions",result);
        response.json({result});
        
   } 
   console.log('aaaa');
  return listQue();
  }


  
  @Delete("/deleteque/:id")
  deleteQue(@Param("id") id:number, @Body() record:any ,@Res() response:any){
      console.log("Id:",id);
      var queid=new mongo.ObjectID(id);
      async function deleteQue(){
          var result=await que.deleteOne({_id:queid});
          console.log("result;",result);
          response.json({result});
      }
      return deleteQue();
  }
  @Get("/editque/:id")
  getOneQue(@Param ("id") id:any, @Body() record:any, @Res() response:any){
    console.log("Id======>",id);  
    var queid=new mongo.ObjectID(id);
    async function getOneQue(){
        var result=await que.findById({_id:queid}).populate('topic');
        console.log("Result:",result);
        response.json({result});
    }
    return getOneQue();
  }
  @Put("/updateque/:id")
  updateQuestion(@Param ("id") id:number ,@Body() record:any ,@Res() response:any){
      var queid=new mongo.ObjectID(id);
      console.log("Question id:",queid);
      console.log("RECORDD:::::",record);
      async function updateQuestion(){
       var result=await que.collection.updateOne({_id:queid},{$set:record});
       console.log("Result Updated ==========>",result);
       response.json({result});
      }
      return updateQuestion();
  }

}