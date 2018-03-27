const express = require('express');
const mongoose = require('mongoose');

const base = require('./router/base')

const app = express();

var db = mongoose.connect("mongodb://localhost:27017/creeper",(err) => {
    if(err){
      console.log('链接失败:'+err);
    }else{
      console.log('链接mogoose成功');
    }
})
 
app.use('/',base)



app.listen(3333,() => {
  console.log("listening in 3333");
})