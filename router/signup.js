var express=require('express');
var router=express.Router();
var fs=require('fs');
var path=require('path');
var db=require('../db/createconnection')


router.get('/signup',function(req,res){
     res.render('pages/signup');
})

router.post('/signup',function(req,res){
     var body=req.body;
     db.query('SELECT * FROM `user` WHERE `email`=? OR `phoneno`=?',[body.email,body.phoneno],function(error,result){
          if(result.length==0){
                db.query('INSERT INTO user SET ? ',body,function(err,results){
                   if(results) {
                       //create directory file in uploads to stored
                       db.query('SELECT id from user WHERE `email`=? ',[body.email],function(ReturErr,createRec){
                             if(createRec){
                                 //create directory for particular id
                                 var filePath=process.cwd()+'/public/uploads/';
                                 fs.mkdirSync(filePath+`${createRec[0]["id"]}`,{recursive:true},function(direrror){
                                      if(direrror) return console.log("Cannot created bucket");
                                      else return console.log("created bucket");

                                 })
                             }
                       })
                       res.status(200).json({msg:'successfully registed'})
                    
                    }
                   else res.status(200).json({err:'user not found'});
                })
          }
          else res.status(200).json({msg:'please login'})

     })     
 })

module.exports=router;
