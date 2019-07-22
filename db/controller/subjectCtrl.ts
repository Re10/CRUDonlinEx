import { JsonController, Body, Post, Req, Res, UploadedFile, Put, Get, Params, Param, Delete } from "routing-controllers";
import { sub } from "../model/subject";
import { response } from "express";
import * as mongo from 'mongodb';

@JsonController()
export class subController {
     @Post("/addsubject")
     addSub(@Body() record: any,@Res() response:any) {
        console.log(record);
        console.log("IDDDDDDDDDDD========>",record.subName);
        var result;
        var res:any;
        async function addSub(){
            res= await sub.findOne({subName:record.subName});
            if(res){
            console.log("Subject Name Allready Present: ",res);
            }else{
             result= await sub.collection.insertOne(record)
             console.log(result);
             response.json({result});
            }
             
        } 
       return addSub();
       }
       @Get("/listsubject")
       listSub(@Body() record: any,@Res() response:any) {
          var result;
          async function listSub(){
               result= await sub.find();
               response.json({result});
               
          } 
         return listSub();
         }
         @Delete("/deletesubject/:id")
       deleteSub(@Param ("id") id: number,@Body() record: any,@Res() response:any) {
        console.log("within remove function");
        var subid = new mongo.ObjectID(id);
        console.log("SubjectId",subid);
          var result;
          async function deleteSub(){
               result= await sub.deleteOne({_id:subid});
               console.log(result);
               response.json({result});
               
          } 
         return deleteSub();
         }

}
