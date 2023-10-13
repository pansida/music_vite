import { defineStore } from "pinia";

export const useMusicPlayer = defineStore("MusicPlayer", {
  state: () => ({
    // 歌单
    musicList: [] as any,
    // 音乐id
    musicId: "",
    // 获取歌曲url
    musicUrl: "",
    // 音乐总时间
    musicTime: "",
    // 是否随机播放
    isRandomMusicBack: false,
    // 播放状态
    isMusicPlay: false,
    // 当前音乐index
    currentMusicIndex: 0,
    // 当前音乐信息
    musicDetail: [] as any,
    // 当前音乐总时间
    duration: 0,
    // 音乐是否加载中
    isMusicLoad: false,
    // 当前播放时间
    currentTime: 0,
  }),
});
