var express=require('express');
var router=express.Router();
var path=require('path');
var fs=require('fs');

router.get('/fileupload',function(req,res){
       res.render('pages/upload');
})

router.get('/vs',function(req,res){
      res.sendFile(process.cwd()+'/public/video/index.html');
})


router.get('/video',(req,res)=>{
   var range=req.headers.range
    if(!range) res.status(400).send("Requires range header");;
      
    var videoPath=process.cwd()+'/public/uploads/video.mp4';
    console.log(videoPath);
    var videoSize=fs.statSync(videoPath).size;
    console.log(videoSize);

    //parse range
    var CHUNK_SIZE = 10 ** 6;
    var start=Number(range.replace(/\D/g,""));
    var end=Math.min(start+CHUNK_SIZE,videoSize-1);

    const contentLength=end-start + 1;
    const headers={
        'Content-Range':`bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges':'bytes',
        'Content-Length':contentLength,
        'Content-Type':'video/mp4'
    }

   //HTTp statu(206) partial content
   res.writeHead(206,headers);

   //read particular chunk
   const videoStream=fs.createReadStream(videoPath,{start,end});

   //stream the video chunk to the client
   videoStream.pipe(res);

})

module.exports=router;