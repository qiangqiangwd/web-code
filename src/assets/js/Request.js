/**
 * 对 axios 的相关配置
 */
import axios from 'axios'
import $loading from './loading'; // 引入 loading
import $message from './message'; // 引入 提示弹出

// 根据当前环境配置对应请求路径
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:9091/'
} else if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = '/'
}
// 请求超时的时间
axios.defaults.timeout = 10000;
// 请求头信息是为post请求设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截器
axios.interceptors.request.use(
    config => {
        let token = window.localStorage.getItem('CQUID'); // 在 localStorage 中获取登录的 token（CQUID）
        // 每次发送请求之前判断是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况，此处token一般是用户完成登录后储存到localstorage里的
        token && (config.headers.Authorization = token);
        return config
    },
    error => {
        return Promise.error(error)
    })
// 响应拦截器
axios.interceptors.response.use(response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
        // if (response.data.code === 511) {
        //     // 未授权调取授权接口
        // } else if (response.data.code === 510) {
        //     // 未登录跳转登录页
        // } else {
        //     return Promise.resolve(response)
        // }

        return Promise.resolve(response)
    } else {
        return Promise.reject(response)
    }
}, error => {
    // 我们可以在这里对异常状态作统一处理
    if (error.response && error.response.status) {
        // 处理请求失败的情况
        // 对不同返回码对相应处理
        return Promise.reject(error.response)
    } else {
        return Promise.reject(error)
    }
});

// 成功后的返回函数
function successCallback({ data, showErrorMsg }, resolve, reject) {
    $loading.hide();
    // 是否就此展示错误信息
    if (showErrorMsg && !data.status) {
        $message(data.msg);
    }
    resolve(data);
}

// 返回 get 请求
export function httpGet({ url, params = {}, showErrorMsg }) {
    $loading.show();
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
        }).then(res => {
            let data = res.data;
            successCallback({ data, showErrorMsg }, resolve, reject);
        }).catch(err => {
            $loading.hide();
            reject(err);
        });
    }).catch(err => {
        console.log('catch', err);
    });
}

// 返回 post 请求
export function httpPost({ url, data = {}, params = {}, showErrorMsg }) {
    $loading.show();
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'post',
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            // 发送的数据
            data,
            // 存放在url上的数据
            params
        }).then(res => {
            let data = res.data;
            successCallback({ data, showErrorMsg }, resolve, reject);
        }).catch(err => {
            $loading.hide();
            reject(err);
        });
    }).catch(err => {
        console.log('catch',err);
    });
}