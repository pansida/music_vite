import {defineStore} from "pinia"

export const useHeaderStore = defineStore("Header",{
    state:()=>({
        isLogin:false,
        id:""
    }),
    persist: {
        key:"headerLogin",
        storage:window.localStorage,
        paths:["isLogin","id"]
    }
})