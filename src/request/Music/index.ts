import axios from "../axios.config";



export const musicInfo= {
  // 获取个人歌单
  playListDetail: async (id: string, isdateNow = true) => {
    const playList = await axios.get(
      `/playlist/detail?id=${id}${isdateNow ? "&timestamp=" + Date.now() : ""}`
    );
    return playList.data;
  },
  // 获取单独歌曲url
  getSongUrl: async (id: string) => {
    const songurl = await axios.get(`/song/url?id=${id}`);
    return songurl.data.data;
  },
  // 获取轮播图url
  getSwiperUrl: async () => {
    const swiper = await axios.get("/banner");
    return swiper.data;
  },
  // 获取个人推荐前10条
  getPersonalized: async () => {
    const PersonalizList = await axios.get("/personalized?limit=10");
    return PersonalizList.data;
  },
  // 获取精品歌单top
  getHighquality: async () => {
    const highquality = await axios.get("/top/playlist/highquality?limit=1");
    return highquality.data;
  },
  // 获取歌单分类
  getMusicSort: async () => {
    const musicSort = await axios.get("/playlist/catlist");
    return musicSort.data;
  },
  //获取歌单单个分类信息
  getListCard: async (cat: string, offset: number) => {
    const listCard = await axios.get(
      `/top/playlist?cat=${cat}&offset=${offset}`
    );
    return listCard.data;
  },
  // 根据id获取完整歌单
  getListIdMusic: async (ids: string) => {
    const listIdMusic = await axios.get(`/song/detail?ids=${ids}`);
    return listIdMusic.data;
  },
  // 根据id获取单个歌曲url
  getMusicUrl: async (id: string) => {
    const musicUrl = await axios.get(`/song/url?id=${id}`);
    return musicUrl.data;
  },
  // 获取排行榜
  getMusicTop: async () => {
    const musicTop = await axios.get("/toplist");
    return musicTop.data.list;
  },
  // 获取歌手筛选
  getArtist: async (
    language: number,
    type: number,
    initial: number | string,
    offset: number
  ) => {
    offset = (offset - 1) * 30;
    const artist = await axios.get(
      `/artist/list?initial=${initial}&type=${type}&area=${language}&offset=${offset}`
    );
    return artist.data;
  },
  // 获取歌单评论
  getReview: async (id: string, offset = 1) => {
    offset = (offset - 1) * 20;
    const review = await axios.get(`/comment/playlist?id=${id}&offset=${offset}`);
    return review.data;
  },
  // 发送评论
  getComment:async (type:number,id:string,content:string,timestamp=false,commentId='',t=1)=>{
    const comment = await axios.get(`/comment?t=${t}&type=${type}&id=${id}&content=${content}${commentId?`&commentId=${commentId}`:''}${timestamp?`&timestamp=${Date.now()}`:''}`)
    return comment.data
  },
  getSearchList:async ()=>{
    const searchList = await axios.get('/search/hot/detail')
    return searchList.data
  }
};
