import axios from '../utils/request'
import { BannerData, RecommendData } from '@/views/recommend/type'
import { SingerListParams, SingerDataResponse } from '@/views/singer/type'

// 推荐页轮播图
export const getBannerRequest = (): Promise<BannerData> => {
  return axios.get('/banner')
}

// 推荐列表
export const getRecommendListRequest = (): Promise<RecommendData> => {
  return axios.get('/personalized')
}

// 获取热门歌手列表
export const getHotSingerListRequest = (
  count: number
): Promise<SingerDataResponse> => {
  return axios.get(`/top/artists?offset=${count}`)
}

// 获取歌手列表
export const getSingerListRequest = (
  params: SingerListParams
): Promise<SingerDataResponse> =>
  axios.request({
    url: '/artist/list',
    params
  })

// export const getSingerListRequest = (params) => {
//   return axios.request({
//     url: '/artist/list',
//     params
//   })
// }

// export const getRankListRequest = () => {
//   return axios.get('/toplist/detail')
// }

// export const getAlbumDetailRequest = (id) => {
//   return axios.get(`/playlist/detail?id=${id}`)
// }

// export const getSingerInfoRequest = (id) => {
//   return axios.get(`/artists?id=${id}`)
// }

// export const getHotKeyWordsRequest = () => {
//   return axios.get('/search/hot')
// }

// export const getSuggestListRequest = (query) => {
//   return axios.get(`/search/suggest?keywords=${query}`)
// }

// export const getResultSongsListRequest = (query) => {
//   return axios.get(`/search?keywords=${query}`)
// }

// export const getSongDetailRequest = (id) => {
//   return axios.get(`/song/detail?ids=${id}`)
// }

// export const getLyricRequest = (id) => {
//   return axios.get(`/lyric?id=${id}`)
// }

// export const loginByPhoneRequest = (phone, password) => {
//   return axios.get(`/login/cellphone?phone=${phone}&password=${password}`)
// }

// export const sentVcodeRequest = (phone) => {
//   return axios.get(`/captcha/sent?phone=${phone}`)
// }

// export const loginByVcodeRequest = (phone, vcode) => {
//   return axios.get(`/captcha/verify?phone=${phone}&captcha=${vcode}`)
// }
