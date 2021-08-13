var express=require('express');
var router = express.Router();
var multer=require('multer');
var path=require('path');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const got=require('got');

var db = require('../db/createconnection');



//Set Storage Engine
function setStorage(bucket_id){
  var storage=multer.diskStorage({
    destination:`./public/uploads/${bucket_id}/`,
    filename:function(req,file,cb){
        cb(null,file.fieldname+' '+Date.now()+path.extname(file.originalname));

    }
  })

  var upload=multer({
    storage:storage,
    fileFilter:function(req,file,cb){
       checkFileType(file,cb);
    } 
   }).single('fileupload');

   return upload;
}
//chack file Type
function checkFileType(file,cb){
    var fileTypes=/jpg|jpeg|mp4/;
    var extname = fileTypes.test(path.extname(file.originalname).toLowerCase()) ;
    var mimeType=fileTypes.test(file.mimetype);
    
    if(mimeType && extname){
        return cb(null,true);
    }else{
        return cb("unknown file format");
    }
}

function UploadFile(req,res,bucket_id){
   if(typeof Number(bucket_id) == 'number'){
    var upload=setStorage(Number(bucket_id));
     upload(req,res,(err)=>{
        if(err){
            res.sendStatus(404).json({msg:'something went wrong'})
        }else{
          if(req.file==undefined){
              res.send({fileErr:'no file selected!'})
          }
          else{
             res.status(200).json({msg:"file uploaded successfully"});
              //res.sendFile(`${_dirname}/uploads/${req.file.filename}`);
             //stored respectively id user 
               
 
          }
  
        }
     })
    }else{
         res.status(200).json({err:'please login account'})
    }
}

router.post('/fileupload',async function(req,res){
    // // var BucketId=await GetId();
    // // await UploadFile(req,res,Number(BucketId));
    // router.get('/fileupload',function(Getreq,Getres){
    //     var BucketId=Getreq.body.id;
    //     UploadFile(req,res,Number(BucketId))
    // })
    UploadFile(req,res,Number(BucketId)) //storing not null bucket -- issue 

});


//see profile for particular user 
 router.get('/profile/:id',async function(req,res){
     try{
      var id=req.params.id;
      db.query('SELECT * FROM user where `id`=?',[id],function(error,results){
          if(error) console.log("geting db error");
          else {
              console.log(results);
              return res.send(results);
          }
      })
    }catch(err){
        console.log("somthiing wrong");

    }
 })


 module.exports=router;