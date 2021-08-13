var express=require('express');
var app=express();
var path=require('path');
var formidable=require('formidable');
var fs=require('fs');


var PORT=7000 || process.env.PORT;

//body parser
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//app view engine
app.set('view engine','ejs');

//routing handling
app.get('/',function(req,res){
    res.render('pages/home')
})

//user actions 
app.use('/',require('./router/video'));
app.use('/',require('./router/signup'));
app.use('/',require('./router/login'));

//fileupload
app.use('/',require('./router/fileupload'))

//create mysql database connection
require('./db/createconnection');


app.listen(PORT,function(req,res){
    console.log("App running");
})