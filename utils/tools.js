const superagent = require("superagent");

class Http {
  get(url) {
    return new Promise((resolve, reject) => {
      superagent.get(url).retry(4).end((err, res) => {
        if (err) throw err;
        if (res.ok) {
          resolve(res);
        }else{
          reject('请求超时')
        }
      });
    });
  }

  post(url, type, data) {
    return new Promise((resolve,reject) => {
        superagent.post(url).type(type).send(data).retry(4).end((err,res) => {
          if(err)throw err;
          if(res.ok){
            resolve(res)
          }else{
            reject('请求超时')
          }
        })
    })
  }
}

module.exports = http = new Http();
