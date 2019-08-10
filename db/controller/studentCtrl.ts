import { JsonController, Body, Post, Req, Res, UploadedFile, Put, Get, Params, Param, Delete } from "routing-controllers";
import { stud } from "../model/student";
import { response } from "express";
import * as mongo from 'mongodb';
import { mongoose } from "../config";
var XLSX = require('xlsx');
const nodemailer = require("nodemailer");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');
var readXlsxFile = require('read-excel-file/node');
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req: any, file: any, callback: any) {
        callback(null, './uploads');
    },
    filename: function (req: any, file: any, callback: any) {
        callback(null, file.originalname);
        console.log("file original name:", file.originalname);
    }
});

var upload = multer({ storage: storage });

@JsonController()
export class studController {
    @Post('/read')
    readData(@UploadedFile('file', { options: upload }) file: any, @Body() record: any, @Res() response: any) {
        console.log("Witth in Function");
        console.log("Witth in Function FILE UPLOAD=>", file);
        console.log("Data=>", record);
        console.log("Data Date=>", record.date);
        var workbook = XLSX.readFile(file.path);
        const sheet_name_list = workbook.SheetNames;
        var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list])
        console.log(data);
        console.log("Length==>", data.length);
        var testID = new mongoose.Types.ObjectId(record.id);
        console.log("test id", testID);
        var details = [];
       
        for (let i = 0; i < data.length; i++) {
               
                details[i] = {

                    name: data[i].Name,
                    email: data[i].Email,
                    pass: data[i].Password,
                    // marks:[{
                    //     mark:2,
                    //     status:'Fail',
                    //     correctAns: 0

                    // }]
                }
            

        }
        console.log("Details===>", details);
        var recordData: any = {
            title: record.title,
            description: record.description,
            testId: testID,
            studentlist: details,
            date: record.date
        }
        console.log("RECORD ISSS", recordData);
        async function readData() {
            var result = await stud.collection.insertOne(recordData);
            console.log("Result=>", result);
            console.log("Length:", result);
            response.json({ result });

        }

        return readData();

    }
    @Get("/liststud")
    listStud(@Body() record: any, @Res() response: any) {
        var result;
        async function listStud() {
            result = await stud.find();
            response.json({ result });

        }
        return listStud();
    }
    @Get("/listonetest/:id")
    listOneStud(@Param("id") id: number, @Body() record: any, @Res() response: any) {
        var result;
        var temparr;
        console.log("Id===>", id);
        async function listOneStud() {
            result = await stud.find({ '_id': id });
            console.log("RESULTTTTT", result);
            console.log(result[0].studentlist.length);
            for (let i = 0; i < result[0].studentlist.length; i++) {
                console.log("name==", result[0].studentlist[i].name);
                console.log("pass==", result[0].studentlist[i].pass);
                console.log("date==", result[0].date);
                var encrypt = cryptr.encrypt(result[0].studentlist[i].pass);
                console.log("Encrypted Pass", encrypt);
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: "rekhagaware10@gmail.com",
                        pass: 'ygqzevxizjvmnopd'
                    }
                });
                const mailOptions = {
                    from: "rekhagaware10@gmail.com", // sender address
                    to: result[0].studentlist[i].email, // list of receivers
                    subject: 'Your Test Date Nd Time', // Subject line
                    html: "Go to this Url:" + 'file:///home/am-n6/Rekha/online-Exam-Db/angular/userindex.html#!/login'+result[0]._id   + "<br>Your Password:" + encrypt +
                        "<br>Date:" + result[0].date   // plain text body
                };

                var send = await transporter.sendMail(mailOptions);

            }

            response.json({ result });

        }
        return listOneStud();
    }
    @Post('/login')
    login(@Body() record: any, @Res() response: any) {
        console.log("Record", record);
        var decrypt = cryptr.decrypt(record.pass);
        console.log("Decrypt", decrypt);
        async function login() {
            var result: any = await stud.find({ 'studentlist.email': record.email }, { 'studentlist.pass': record.pass });
            console.log("RES:::", result);
            console.log("RES:::", result[0].studentlist[0]);
            if (result) {
                let payload = { subject: record.email };
                let token = jwt.sign(payload, 'secretkey');
                console.log("Token ", token);
                response.json({ token, result });
            }
            else {
                console.log("Email Id Not Foud==>");
            }

        }
        return login();

    }

    @Put('/updateStud/:id')
    updateStudent(@Param("id") id: number,@Body() record: any, @Res() response: any) {
        console.log("Id==>",id);
        var studtestid=new mongo.ObjectID(id);
        console.log("Record is", record);
       
        var marksDetail=[{
             mark:record.marks,
            status:record.status,
            correct:record.correct
        }]
        console.log("markdeatils",marksDetail);
        var decoded = jwtDecode(record.token);
        console.log(decoded);
        console.log("email", decoded.subject);
        async function updateStudent(){
            var data=await stud.findOne({ 'studentlist.email': decoded.subject });
            console.log("=====>",data);
             if(data){
               console.log("data found");
               var result :any=await stud.findOne({ '_id':studtestid , 'studentlist':{$elemMatch:{'email':decoded.subject}}});
               console.log("Result==>:::",result);
  
            //    var dataresult=await stud.updateOne({ '_id':studtestid},{ 'studentlist':{$elemMatch:{'email':decoded.subject}}},{$set:{'studentlist.marks':marksDetail}});
            //     console.log("Result==>:::HERE==>",dataresult);
             }

       }
   return updateStudent();



    }
}