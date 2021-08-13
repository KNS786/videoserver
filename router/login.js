var express=require('express');
var router=express.Router();
var db=require('../db/createconnection');

router.get('/login',function(req,res){
      res.render('pages/login');
      
})


router.post('/login',async function(req,res){
    try{
    var {email,password}=req.body;
    db.query('SELECT id FROM user WHERE `email`=? AND `password`=?',[email,password],async function(error,results){
        if(results.length > 0 ){
            console.log(results);
            await router.post('/fileupload',async function(myreq,myres){
                 await myres.status(200).json({id:results[0]["id"]})
            })
            await res.status(200).json({msg:'sucessfully login'})
        }
        else{
            res.status(400).json({msg:'please register account'})
        }
    })
   }catch(err){
       res.status(200).json({err:'something wrtong'})
       console.log("somthing went wrong login side");
   }
})

module.exports=router;