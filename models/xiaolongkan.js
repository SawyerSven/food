const mongoose = require("mongoose");

const provinceSchema = mongoose.Schema({
    name:String
},{collection:'xlk_province'});

const citySchema = mongoose.Schema({
    city:String,
},{collection:'xlk_city'})

const storeSchema = mongoose.Schema({
    province:String,
    city:String,
    store:String,
    quyu:String,
    address:String
},{collection:'xlk_store'})

 exports.Province = mongoose.model('province',provinceSchema)
 exports.City = mongoose.model('city',citySchema)
 exports.Store = mongoose.model('store',storeSchema)