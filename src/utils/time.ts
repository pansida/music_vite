import moment from "moment"
export const formatTime = {
    // 获取这样形式时间格式2020-01-01
    getFormatTime: (time: number) => {        
        return moment(time).format().split("T")[0]
    },
    // 将时间转换成10:00 分钟形式
    getMinutes:(time:number)=>{
        return moment(time).format('mm:ss')
    },
    // 将时间转换成10s形式
    getseconds:(time:number)=>{
        return moment(time).unix()
    },
    getsecondsPro:(seconds:number)=>{
        var duration = moment.duration(seconds,'seconds')
        var m = duration.minutes()
        var s = duration.seconds()
        return `${m<10?'0'+m:m}:${s<10?'0'+s:s}`;
    }
}