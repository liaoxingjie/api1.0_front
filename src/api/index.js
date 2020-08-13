import axios from './http'
import qs from 'qs';

var API = {}

API.get = function (url, config={}) {
    return new Promise((resolve, reject) => {
        axios.get(url, config).then(res => {
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
    })
};

API.post = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data)).then(res => {
            resolve(res.data)
        }).catch(error => {
            reject(error)
        })
    });
};

API.put = function (url, data = {}) { 
    return new Promise((resolve, reject) => { 
        axios.put(url,data) .then(res => { 
            resolve(res.data)
        }, err => { 
            reject(err) 
        })
    });
};         

API.delete= function (url) { 
    return new Promise((resolve, reject) => { 
        axios.delete(url).then(res => { 
            resolve(res.data)
        }, err => { 
            reject(err) 
        })
    });
};  


export default API;