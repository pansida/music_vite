import axios from "../axios.config";
// 二维码登录
interface qr {
    generateKey: () => Promise<string>;
    generateBaseUrl: (unikey: string) => Promise<string>;
    generateStatus:(unikey:string)=>Promise<number>
}
export const qr:qr = {
    // 二维码生成key接口
    generateKey: async () => {
      const timer = Date.now();
      const key = await axios.post("/login/qr/key", { timer });
      console.log(key.data.data.unikey);
      return key.data.data.unikey;
    },
    //  二维码生成base64接口
    generateBaseUrl: async (unikey: string) => {
      const timer = Date.now();
      const baseUrl = await axios.post("/login/qr/create", {
        key: unikey,
        qrimg:true,
        timer,
      });
      return baseUrl.data.data.qrimg;
    },
    // 二维码检测接口
    generateStatus:async (unikey:string)=>{
        const timer = Date.now();
        const status =await axios.get(`/login/qr/check?key=${unikey}&timer=${timer}`)
        return status.data.code
    }
};

interface captcha {
  sendCaptcha: (phone: string) => void;
  verifyCaptcha: (phone: string, captcha: string) => Promise<string>;
  loginCaptcha: (phone: string, password: string,captcha: string) => Promise<string>;
}
export const captcha:captcha = {
  sendCaptcha:async(phone:string)=>{
    await axios.post('/captcha/sent?',{phone})
  },
  verifyCaptcha:async(phone:string,captcha:string)=>{
    const verify = await axios.post('/captcha/verify',{phone,captcha})
    return verify.data.data
  },
  loginCaptcha:async(phone:string,password:string,captcha:string)=>{
    const status = await axios.post('/login/cellphone',{phone,password,captcha})
    return status.data
  }

}
