const superagent = require("superagent");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

const http = require("../utils/tools");
const xiaolongkan = require("../models/xiaolongkan");

const xlkUrl = "http://www.xiaolongkan.com/storesFind.html";

var db = mongoose.connect("mongodb://localhost:27017/creeper", err => {
  if (err) {
    console.log("链接失败:" + err);
  } else {
    console.log("链接mogoose成功");
  }
});

function getCity() {
  const xlkCityUrl = "http://www.xiaolongkan.com/api/store/city";
  http
    .get(xlkUrl)
    .then(res => {
      let $ = cheerio.load(res.text);
      $(".serch ul li").each((i, elem) => {
        let province = $(elem).text();
        setTimeout(() => {
          http
            .post(xlkCityUrl, "form", { province })
            .then(res => {
              return JSON.parse(res.text).data.store_list;
            })
            .then(res => {
              xiaolongkan.City.remove(err => {
                if (err) {
                  console.log(err);
                } else {
                  for (let c of res) {
                    xiaolongkan.City.create(c, (err, res) => {
                      if (err) {
                        console.log(err);
                      }
                      console.log("添加成功");
                    });
                  }
                }
              });
            })
            .catch(err => {
              console.log(err);
            });
        }, 2000);
      });
    })
    .catch(err => {
      console.error(err);
    });
}

function searchCity(text) {
  let data = xiaolongkan.City.find({ city: text }, (err, data) => {
    return data;
  });
  return data;
}

async function getStore() {
  const url = "http://www.xiaolongkan.com/api/store/tp";
  const data = await xiaolongkan.City.find();
  xiaolongkan.Store.remove(err => {
    for (item of data) {
      let city = item.city;
      http.post(url, "form", { city }).then(res => {
        let data = JSON.parse(res.text).data.store_list;
        if (err) throw err;
        for (let i of data) {
          let store = {
            province: i.province,
            city: i.city,
            address: i.address,
            quyu: i.quyu,
            store: i.store
          };
          xiaolongkan.Store.create(store, (err, res) => {
            console.log(res);
          });
        }
      });
    }
  });
}
getStore();

// exports.getProvince = getProvince;
exports.getCity = getCity;
exports.searchCity = searchCity;
