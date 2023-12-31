import {message} from "ant-design-vue"
import axios from 'axios'
import {useHeaderStore} from "@/store/header"

const headerStore = useHeaderStore()

const instance = axios.create({
    baseURL: 'https://cloud.pansida.cn',
    // baseURL: '/api',
    timeout:30000,
    withCredentials:true,
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const code = response.data.code;
      if (code !== 200 && !(code >= 800 && code <= 803))
      message.error(response.data.message || '未知错误, 请打开控制台查看');
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if(error.response.data.msg === "需要登录"){
      headerStore.isLogin = false
    }else{
      message.error(error.response.data.message || "未知错误，请打开控制台查看")
    }
    
    return Promise.reject(error);
  });

export default instance