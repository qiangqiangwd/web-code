/**
 * ajax 接口请求，总的部分
 */
import { httpGet, httpPost } from '../../assets/js/Request' // 获取请求js
let ajaxModules = {}; // 所有 ajax 的合集

/** 
 * 获取在 ajax 文件夹下所有js相关文件
*/
const files = require.context('./ajax', false, /\.js$/);
files.keys().forEach(key => {
    // ajaxModules[key.replace(/(\.\/|\.js)/g,'')] = files(key).default;
    let fliesList = files(key).default;
    // 循环存入函数
    for (let name in fliesList) {
        ajaxModules[name] = fliesList[name];
    }
});

// console.log(ajaxModules);
const ajax = {
    namespaced: true, // 保证唯一性
    state: {
        // 判断当前请求方式和一些其他操作
        Request(req) {
            let [type] = [req.type ? req.type.toLowerCase() : 'get'];
            // 判断是什么请求（默认 get）
            if (type === 'get') {
                return httpGet(req);
            } else {
                return httpPost(req);
            }
        },
    },
    mutations: {
    },
    actions: {
        ...ajaxModules
    }
}

export default ajax