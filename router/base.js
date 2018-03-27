const express = require('express');
const xiaolongkan = require('../controller/xiaolongkan')

const router = express.Router();

router.get('/refresh',(req,res) => {
  // var data = xiaolongkan.getProvince();
  var city = xiaolongkan.getCity();
  res.end('获取成功')
})

router.get('/search',async (req,res) => {
  let data = await xiaolongkan.searchCity(req.query.name);
  res.json(data);
})

module.exports = router;