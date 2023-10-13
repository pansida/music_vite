import axios from "../axios.config";

interface userInfo{
    getAccountInfo:()=>Promise<string>,
    getstatus:()=>Promise<number>,
    getDetail:(uid:string)=>Promise<any>
    getPlaylist:(uid:string)=>Promise<any>
}

export const userInfo = {
    getAccountInfo:async()=>{
        const info = await axios.get(`/user/account?timestamp=${Date.now()}`)
        return info.data
      },
      getstatus:async()=>{
        const status = await axios.get('/login/status')
        return status.data
      },
      getDetail:async(uid:string)=>{
        const detail = await axios.get(`/user/detail?uid=${uid}`)
        return detail.data
      },
      getPlaylist:async(uid:string)=>{
        const playlist = await axios.post('/user/playlist',{uid})
        return playlist.data
      }
}