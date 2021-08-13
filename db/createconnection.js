//database connection
var express=require('express');
var mysql=require('mysql2');

var mysqlConnection=mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    database:'moviemaker',
    password:'password',
    multipleStatements:true

})

mysqlConnection.connect(function(err){
    if(!err) console.log("mysql connected");
    else console.error(err);
})

module.exports=mysqlConnection;
